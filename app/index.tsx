import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  Alert,
  Vibration
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

interface QuickAction {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  route: string;
  color: string;
  size: 'large' | 'small';
}

export default function HomeScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [weather, setWeather] = useState({ temp: '22°C', condition: 'Sunny' });

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location access is needed to tag your field observations');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  const handleQuickAction = (route: string) => {
    Vibration.vibrate(50); // Haptic feedback
    router.push(route as any);
  };

  const quickActions: QuickAction[] = [
    { icon: 'mic', label: 'Voice Note', route: '/voice', color: '#3b82f6', size: 'large' },
    { icon: 'camera', label: 'Field Photo', route: '/camera', color: '#10b981', size: 'large' },
    { icon: 'time', label: 'Recent', route: '/history', color: '#6b7280', size: 'small' },
    { icon: 'sync', label: 'Sync', route: '/sync', color: '#8b5cf6', size: 'small' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>🤖</Text>
            </View>
            <View>
              <Text style={styles.appName}>Bizzy Capture</Text>
              <Text style={styles.subtitle}>Quick field notes</Text>
            </View>
          </View>
          
          <View style={styles.weatherWidget}>
            <Ionicons name="sunny" size={16} color="#f59e0b" />
            <Text style={styles.weatherText}>{weather.temp}</Text>
          </View>
        </View>
      </View>

      {/* Location Status */}
      {location && (
        <View style={styles.locationBar}>
          <Ionicons name="location" size={14} color="#10b981" />
          <Text style={styles.locationText}>
            Location: {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
          </Text>
        </View>
      )}

      {/* Main Actions */}
      <View style={styles.mainActions}>
        <Text style={styles.sectionTitle}>Quick Capture</Text>
        
        <View style={styles.actionGrid}>
          {quickActions.filter(action => action.size === 'large').map((action) => (
            <TouchableOpacity
              key={action.label}
              style={[styles.largeAction, { backgroundColor: action.color }]}
              onPress={() => handleQuickAction(action.route)}
              activeOpacity={0.8}
            >
              <Ionicons name={action.icon} size={32} color="white" />
              <Text style={styles.largeActionText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.smallActionGrid}>
          {quickActions.filter(action => action.size === 'small').map((action) => (
            <TouchableOpacity
              key={action.label}
              style={[styles.smallAction, { backgroundColor: action.color }]}
              onPress={() => handleQuickAction(action.route)}
              activeOpacity={0.8}
            >
              <Ionicons name={action.icon} size={20} color="white" />
              <Text style={styles.smallActionText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Today's Activity</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Voice Notes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Photos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Fields</Text>
          </View>
        </View>
      </View>

      {/* Bottom Tip */}
      <View style={styles.tipContainer}>
        <Ionicons name="bulb" size={16} color="#f59e0b" />
        <Text style={styles.tipText}>
          Tip: Hold voice button for hands-free recording while in the field
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#10b981',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 20,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  weatherWidget: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  weatherText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#065f46',
    marginLeft: 4,
  },
  mainActions: {
    padding: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  largeAction: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  largeActionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  smallActionGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  smallAction: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  smallActionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  statsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    margin: 20,
    padding: 12,
    borderRadius: 8,
  },
  tipText: {
    fontSize: 12,
    color: '#92400e',
    marginLeft: 8,
    flex: 1,
  },
});