import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function OnboardingScreen({ navigation }) {
  const { user, setUser } = useAuth();

  const setRole = async (role) => {
    const { data } = await api.put('/users/me', { role });
    setUser(data);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quel est votre rôle ?</Text>
      <TouchableOpacity style={styles.card} onPress={() => setRole('intermittent')}><Text style={styles.cardText}>Intermittent</Text></TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => setRole('recruteur')}><Text style={styles.cardText}>Recruteur</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 24, justifyContent: 'center' },
  title: { color: colors.text, fontSize: 24, fontWeight: '700', marginBottom: 24, textAlign: 'center' },
  card: { backgroundColor: '#1f1f1f', padding: 20, borderRadius: 12, marginBottom: 12 },
  cardText: { color: '#fff', textAlign: 'center', fontSize: 18 }
});
