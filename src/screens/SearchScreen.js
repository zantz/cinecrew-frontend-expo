import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import api from '../services/api';
import { colors } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';

export default function SearchScreen() {
  const { user } = useAuth();
  const [tab, setTab] = useState('profils'); // 'profils' | 'missions'
  const [q, setQ] = useState('');
  const [data, setData] = useState([]);

  const search = async () => {
    if (tab === 'profils') {
      const res = await api.get('/users/search', { params: { q } });
      setData(res.data);
    } else {
      const res = await api.get('/missions', { params: { q } });
      setData(res.data);
    }
  };

  useEffect(() => { search(); }, [tab]);

  const renderItem = ({ item }) => {
    if (tab === 'profils') {
      return (
        <View style={styles.card}>
          <Text style={styles.title}>{item.nom} {item.disponibilite ? '🟢' : '⚪️'}</Text>
          <Text style={styles.text}>{item.metier} — {item.localisation || 'N/A'}</Text>
          <Text style={styles.text} numberOfLines={2}>{item.bio}</Text>
        </View>
      );
    }
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.titre}</Text>
        <Text style={styles.text}>{item.lieu} — {new Date(item.date_debut).toLocaleDateString()}</Text>
        <Text style={styles.text} numberOfLines={2}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setTab('profils')} style={[styles.tab, tab==='profils' && styles.active]}><Text style={styles.tabText}>Profils</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('missions')} style={[styles.tab, tab==='missions' && styles.active]}><Text style={styles.tabText}>Missions</Text></TouchableOpacity>
      </View>
      <View style={styles.searchRow}>
        <TextInput placeholder="Rechercher..." placeholderTextColor="#777" style={styles.input} value={q} onChangeText={setQ} />
        <TouchableOpacity style={styles.btn} onPress={search}><Text style={styles.btnText}>OK</Text></TouchableOpacity>
      </View>
      <FlatList data={data} keyExtractor={(item, idx) => item._id || String(idx)} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  tabs: { flexDirection: 'row', marginBottom: 12 },
  tab: { flex: 1, padding: 12, backgroundColor: '#1f1f1f', borderRadius: 8, marginRight: 8 },
  active: { backgroundColor: colors.accent },
  tabText: { color: '#fff', textAlign: 'center' },
  searchRow: { flexDirection: 'row', marginBottom: 12 },
  input: { flex: 1, backgroundColor: '#1f1f1f', color: '#fff', padding: 12, borderRadius: 8 },
  btn: { marginLeft: 8, backgroundColor: colors.accent2, paddingHorizontal: 16, justifyContent: 'center', borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: '700' },
  card: { backgroundColor: '#1f1f1f', padding: 12, borderRadius: 10, marginBottom: 10 },
  title: { color: '#fff', fontWeight: '700', marginBottom: 4 },
  text: { color: '#ddd' }
});
