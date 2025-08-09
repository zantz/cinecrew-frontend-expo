import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { AuthProvider } from './src/contexts/AuthContext';
import RootNavigator from './src/navigation';
import Constants from 'expo-constants';

export default function App() {
  const publishableKey = Constants.expoConfig?.extra?.stripePublishableKey || 'pk_test_xxx';
  return (
    <StripeProvider publishableKey={publishableKey}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </StripeProvider>
  );
}
