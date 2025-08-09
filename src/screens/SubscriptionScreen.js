import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { colors } from '../styles/theme';

export default function SubscriptionScreen() {
  const { user } = useAuth();
  const [sub, setSub] = useState(null);

  const load = async () => {
    const { data } = await api.get('/subscriptions/me');
    setSub(data);
  };

  useEffect(() => { load(); }, []);

  const startCheckout = async (plan) => {
    try {
      const { data } = await api.post('/subscriptions/checkout-session', { plan });
      if (data?.url && data.url !== 'stripe_not_configured') {
        Linking.openURL(data.url);
      } else {
        Alert.alert('Mode dev', 'Stripe non configuré - simuler activation');
        await api.post('/subscriptions/dev/set-status', { type_abonnement: plan === 'premium' ? 'premium' : 'recruteur', statut: 'actif' });
        load();
      }
    } catch (e) {
      Alert.alert('Erreur', 'Impossible de créer une session');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abonnements</Text>
      <Text style={styles.subtitle}>Statut actuel : {sub ? sub.statut : 'aucun'}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Intermittent Premium</Text>
        <Text style={styles.cardText}>9,90 €/mois — candidatures illimitées, mise en avant</Text>
        <TouchableOpacity style={styles.btn} onPress={() => startCheckout('premium')}>
          <Text style={styles.btnText}>S'abonner</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pack Recruteur</Text>
        <Text style={styles.cardText}>29 €/mois — annonces illimitées, profils disponibles, messagerie</Text>
        <TouchableOpacity style={styles.btn} onPress={() => startCheckout('recruteur')}>
          <Text style={styles.btnText}>S'abonner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  title: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: '#ccc', marginBottom: 16 },
  card: { backgroundColor: '#1f1f1f', padding: 16, borderRadius: 10, marginBottom: 12 },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 6 },
  cardText: { color: '#ddd', marginBottom: 12 },
  btn: { backgroundColor: colors.accent2, padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' }
});
