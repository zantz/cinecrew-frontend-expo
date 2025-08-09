import { io } from 'socket.io-client';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl || 'http://localhost:5000';

let socket;

export function getSocket() {
  if (!socket) {
    socket = io(API_BASE_URL, { transports: ['websocket'] });
  }
  return socket;
}
