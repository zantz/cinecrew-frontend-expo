import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../styles/theme';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');

  const onSubmit = async () => {
    try {
      await login(email, motdepasse);
    } catch (e) {
      alert('Connexion impossible');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CinéCrew</Text>
      <TextInput placeholder="Email" placeholderTextColor="#777" style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput placeholder="Mot de passe" placeholderTextColor="#777" style={styles.input} value={motdepasse} onChangeText={setMotdepasse} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={onSubmit}><Text style={styles.buttonText}>Se connecter</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={styles.link}>Créer un compte</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 24, justifyContent: 'center' },
  title: { color: colors.text, fontSize: 28, fontWeight: '700', marginBottom: 24, textAlign: 'center' },
  input: { backgroundColor: '#1f1f1f', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: colors.accent, padding: 14, borderRadius: 8, marginTop: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  link: { color: colors.accent2, textAlign: 'center', marginTop: 12 }
});
