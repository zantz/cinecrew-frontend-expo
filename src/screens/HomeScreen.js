import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Bienvenue {user?.nom}</Text>
      <Text style={styles.p}>Rôle : {user?.role}</Text>
      {user?.role === 'recruteur' && (
        <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate('MissionCreate')}>
          <Text style={styles.ctaText}>Publier une mission</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.link} onPress={logout}><Text style={{ color: colors.accent2 }}>Se déconnecter</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  h1: { color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: 8 },
  p: { color: '#ddd', marginBottom: 16 },
  cta: { backgroundColor: colors.accent, padding: 14, borderRadius: 10, marginTop: 12, width: '100%', alignItems: 'center' },
  ctaText: { color: '#fff', fontWeight: '700' },
  link: { marginTop: 24 }
});
