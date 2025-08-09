import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../services/api';
import { colors } from '../styles/theme';

export default function MissionCreateScreen({ navigation }) {
  const [titre, setTitre] = useState('');
  const [lieu, setLieu] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');

  const submit = async () => {
    try {
      await api.post('/missions', {
        titre, lieu, date_debut: dateDebut, budget: budget ? Number(budget) : undefined, description
      });
      Alert.alert('OK', 'Mission publiée');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erreur', 'Impossible de publier');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nouvelle mission</Text>
      <TextInput placeholder="Titre" placeholderTextColor="#777" style={styles.input} value={titre} onChangeText={setTitre} />
      <TextInput placeholder="Lieu" placeholderTextColor="#777" style={styles.input} value={lieu} onChangeText={setLieu} />
      <TextInput placeholder="Date début (YYYY-MM-DD)" placeholderTextColor="#777" style={styles.input} value={dateDebut} onChangeText={setDateDebut} />
      <TextInput placeholder="Budget (nombre)" placeholderTextColor="#777" style={styles.input} value={budget} onChangeText={setBudget} keyboardType="numeric" />
      <TextInput placeholder="Description" placeholderTextColor="#777" style={[styles.input, {height: 100}]} value={description} onChangeText={setDescription} multiline />
      <TouchableOpacity style={styles.button} onPress={submit}><Text style={styles.buttonText}>Publier</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  title: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 12 },
  input: { backgroundColor: '#1f1f1f', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: colors.accent, padding: 14, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '700' }
});
