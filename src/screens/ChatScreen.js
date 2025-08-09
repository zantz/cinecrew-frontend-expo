import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import api from '../services/api';
import { getSocket } from '../services/socket';
import { colors } from '../styles/theme';

export default function ChatScreen({ route }) {
  const { userId } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const load = async () => {
    const { data } = await api.get(`/messages/thread/${userId}`);
    setMessages(data);
  };

  useEffect(() => {
    load();
    const socket = getSocket();
    const handler = (msg) => {
      // naive refresh; in real app filter by userId
      load();
    };
    socket.on('message', handler);
    return () => socket.off('message', handler);
  }, [userId]);

  const send = async () => {
    if (!text.trim()) return;
    await api.post('/messages', { destinataire: userId, contenu: text });
    setText('');
  };

  const renderItem = ({ item }) => (
    <View style={[styles.bubble, item._local ? styles.me : styles.other]}>
      <Text style={styles.bubbleText}>{item.contenu}</Text>
      <Text style={styles.bubbleTime}>{new Date(item.createdAt).toLocaleTimeString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(i, idx) => i._id || String(idx)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12 }}
      />
      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Écrire un message..." placeholderTextColor="#777" />
        <TouchableOpacity style={styles.send} onPress={send}><Text style={styles.sendText}>Envoyer</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  inputRow: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderTopColor: '#222' },
  input: { flex: 1, backgroundColor: '#1f1f1f', color: '#fff', padding: 12, borderRadius: 8, marginRight: 8 },
  send: { backgroundColor: colors.accent, paddingHorizontal: 16, justifyContent: 'center', borderRadius: 8 },
  sendText: { color: '#fff', fontWeight: '700' },
  bubble: { padding: 10, borderRadius: 12, marginVertical: 4, maxWidth: '80%' },
  me: { backgroundColor: colors.accent, alignSelf: 'flex-end' },
  other: { backgroundColor: '#1f1f1f', alignSelf: 'flex-start' },
  bubbleText: { color: '#fff' },
  bubbleTime: { color: '#eee', fontSize: 10, marginTop: 4 }
});
