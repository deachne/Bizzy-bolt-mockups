import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#10b981" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#10b981',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Bizzy Capture',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="camera" 
          options={{ 
            title: 'Field Photo',
            presentation: 'fullScreenModal'
          }} 
        />
        <Stack.Screen 
          name="voice" 
          options={{ 
            title: 'Voice Note',
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="history" 
          options={{ 
            title: 'Recent Captures'
          }} 
        />
      </Stack>
    </SafeAreaProvider>
  );
}