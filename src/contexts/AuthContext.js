import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        try {
          const { data } = await api.get('/users/me');
          setUser(data);
        } catch (e) {
          await SecureStore.deleteItemAsync('token');
        }
      }
      setLoading(false);
    })();
  }, []);

  const login = async (email, motdepasse) => {
    const { data } = await api.post('/auth/login', { email, motdepasse });
    await SecureStore.setItemAsync('token', data.token);
    const me = await api.get('/users/me');
    setUser(me.data);
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    await SecureStore.setItemAsync('token', data.token);
    const me = await api.get('/users/me');
    setUser(me.data);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
