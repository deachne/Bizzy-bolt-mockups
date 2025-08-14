import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../src/index.css';

export default function RootLayout() {
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
            title: 'Bizzy Farm OS',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="inbox" 
          options={{ title: 'Inbox' }} 
        />
        <Stack.Screen 
          name="notes" 
          options={{ title: 'Notes' }} 
        />
        <Stack.Screen 
          name="fields" 
          options={{ title: 'Fields' }} 
        />
        <Stack.Screen 
          name="library" 
          options={{ title: 'Library' }} 
        />
        <Stack.Screen 
          name="crop-planning" 
          options={{ title: 'Crop Planning' }} 
        />
        <Stack.Screen 
          name="accounting" 
          options={{ title: 'Accounting' }} 
        />
        <Stack.Screen 
          name="canvas" 
          options={{ title: 'Canvas' }} 
        />
      </Stack>
    </SafeAreaProvider>
  );
}