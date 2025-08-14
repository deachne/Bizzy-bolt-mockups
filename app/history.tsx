import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

interface CaptureItem {
  id: string;
  type: 'voice' | 'photo';
  timestamp: Date;
  duration?: number;
  location?: string;
  transcription?: string;
  uri: string;
}

export default function HistoryScreen() {
  const router = useRouter();
  const [captures, setCaptures] = useState<CaptureItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'voice' | 'photo'>('all');

  useEffect(() => {
    loadCaptures();
  }, []);

  const loadCaptures = async () => {
    // Mock data - in real app, load from storage
    const mockCaptures: CaptureItem[] = [
      {
        id: '1',
        type: 'voice',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
        duration: 45,
        location: 'NW14',
        transcription: 'Found aphids on the south edge, population below threshold but monitoring needed...',
        uri: 'mock://voice1.m4a'
      },
      {
        id: '2',
        type: 'photo',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        location: 'SW22',
        uri: 'mock://photo1.jpg'
      },
      {
        id: '3',
        type: 'voice',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        duration: 32,
        location: 'SE18',
        transcription: 'Soil moisture looks good after yesterday\'s rain. Ready for seeding operations...',
        uri: 'mock://voice2.m4a'
      },
      {
        id: '4',
        type: 'photo',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        location: 'NE25',
        uri: 'mock://photo2.jpg'
      },
    ];
    
    setCaptures(mockCaptures);
  };

  const filteredCaptures = captures.filter(capture => 
    selectedFilter === 'all' || capture.type === selectedFilter
  );

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCapturePress = (capture: CaptureItem) => {
    if (capture.type === 'voice') {
      Alert.alert(
        'Voice Note',
        capture.transcription || 'No transcription available',
        [
          { text: 'Play', onPress: () => console.log('Play audio') },
          { text: 'Close', style: 'cancel' }
        ]
      );
    } else {
      Alert.alert(
        'Field Photo',
        `Captured at ${capture.location || 'Unknown location'}`,
        [
          { text: 'View Full Size', onPress: () => console.log('View photo') },
          { text: 'Close', style: 'cancel' }
        ]
      );
    }
  };

  const syncCaptures = () => {
    Alert.alert(
      'Sync with Bizzy',
      'Upload all captures to your main Bizzy dashboard?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sync Now', onPress: () => console.log('Syncing...') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Recent Captures</Text>
        <TouchableOpacity onPress={syncCaptures}>
          <Ionicons name="cloud-upload" size={24} color="#10b981" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {(['all', 'voice', 'photo'] as const).map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              selectedFilter === filter && styles.activeFilterTab
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter && styles.activeFilterText
            ]}>
              {filter === 'all' ? 'All' : filter === 'voice' ? 'Voice' : 'Photos'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Captures List */}
      <ScrollView style={styles.capturesList}>
        {filteredCaptures.map((capture) => (
          <TouchableOpacity
            key={capture.id}
            style={styles.captureCard}
            onPress={() => handleCapturePress(capture)}
          >
            <View style={styles.captureHeader}>
              <View style={styles.captureIcon}>
                <Ionicons 
                  name={capture.type === 'voice' ? 'mic' : 'camera'} 
                  size={20} 
                  color="white" 
                />
              </View>
              <View style={styles.captureInfo}>
                <Text style={styles.captureType}>
                  {capture.type === 'voice' ? 'Voice Note' : 'Field Photo'}
                </Text>
                <Text style={styles.captureTime}>
                  {formatTimeAgo(capture.timestamp)}
                </Text>
              </View>
              <View style={styles.captureDetails}>
                {capture.location && (
                  <View style={styles.locationBadge}>
                    <Text style={styles.locationText}>{capture.location}</Text>
                  </View>
                )}
                {capture.duration && (
                  <Text style={styles.durationText}>
                    {formatDuration(capture.duration)}
                  </Text>
                )}
              </View>
            </View>
            
            {capture.transcription && (
              <Text style={styles.transcription} numberOfLines={2}>
                {capture.transcription}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sync Status */}
      <View style={styles.syncStatus}>
        <Ionicons name="cloud-done" size={16} color="#10b981" />
        <Text style={styles.syncText}>
          {captures.length} items ready to sync
        </Text>
        <TouchableOpacity onPress={syncCaptures}>
          <Text style={styles.syncButton}>Sync Now</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterTab: {
    backgroundColor: '#10b981',
  },
  filterText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
  },
  capturesList: {
    flex: 1,
    padding: 20,
  },
  captureCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  captureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  captureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  captureInfo: {
    flex: 1,
  },
  captureType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  captureTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  captureDetails: {
    alignItems: 'flex-end',
  },
  locationBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  locationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  durationText: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'monospace',
  },
  transcription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginTop: 8,
  },
  syncStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#d1fae5',
  },
  syncText: {
    flex: 1,
    fontSize: 14,
    color: '#065f46',
    marginLeft: 8,
  },
  syncButton: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
  },
});