import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';
import { colors } from '../styles/theme';

export default function MessagesScreen({ navigation }) {
  const [msgs, setMsgs] = useState([]);

  const load = async () => {
    const { data } = await api.get('/messages/inbox');
    setMsgs(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [navigation]);

  const openChat = (m) => {
    const other = m.expediteur === m.me ? m.destinataire : m.expediteur;
    navigation.navigate('Chat', { userId: other });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Chat', { userId: item.expediteur })}>
      <Text style={styles.text} numberOfLines={1}>{item.contenu}</Text>
      <Text style={styles.time}>{new Date(item.createdAt).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList data={msgs} keyExtractor={(i, idx) => i._id || String(idx)} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  item: { backgroundColor: '#1f1f1f', padding: 12, borderRadius: 8, marginBottom: 10 },
  text: { color: '#fff' },
  time: { color: '#aaa', fontSize: 12, marginTop: 4 }
});
