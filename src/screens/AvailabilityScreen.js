import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import api from '../services/api';
import { colors } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';

export default function AvailabilityScreen() {
  const { user, setUser } = useAuth();
  const [dispo, setDispo] = useState(!!user?.disponibilite);

  useEffect(() => setDispo(!!user?.disponibilite), [user]);

  const toggle = async (value) => {
    setDispo(value);
    const { data } = await api.put('/users/me', { disponibilite: value });
    setUser(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disponibilité</Text>
      <View style={styles.row}>
        <Text style={styles.label}>{dispo ? 'Disponible' : 'Pas dispo'}</Text>
        <Switch value={dispo} onValueChange={toggle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  title: { color: colors.text, fontSize: 20, fontWeight: '700', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1f1f1f', padding: 16, borderRadius: 10 },
  label: { color: '#fff', fontSize: 16 }
});
