import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../styles/theme';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [role, setRole] = useState('intermittent');

  const onSubmit = async () => {
    try {
      await register({ nom, email, motdepasse, role });
    } catch (e) {
      alert('Inscription impossible');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>
      <TextInput placeholder="Nom" placeholderTextColor="#777" style={styles.input} value={nom} onChangeText={setNom} />
      <TextInput placeholder="Email" placeholderTextColor="#777" style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput placeholder="Mot de passe (min 6)" placeholderTextColor="#777" style={styles.input} value={motdepasse} onChangeText={setMotdepasse} secureTextEntry />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <TouchableOpacity onPress={() => setRole('intermittent')} style={[styles.chip, role==='intermittent' && styles.chipActive]}><Text style={styles.chipText}>Intermittent</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setRole('recruteur')} style={[styles.chip, role==='recruteur' && styles.chipActive]}><Text style={styles.chipText}>Recruteur</Text></TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={onSubmit}><Text style={styles.buttonText}>S'inscrire</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.link}>Déjà un compte ? Se connecter</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 24, justifyContent: 'center' },
  title: { color: colors.text, fontSize: 24, fontWeight: '700', marginBottom: 24, textAlign: 'center' },
  input: { backgroundColor: '#1f1f1f', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: colors.accent, padding: 14, borderRadius: 8, marginTop: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  link: { color: colors.accent2, textAlign: 'center', marginTop: 12 },
  chip: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#1f1f1f' },
  chipActive: { backgroundColor: colors.accent },
  chipText: { color: '#fff' }
});
