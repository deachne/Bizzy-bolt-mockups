import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Vibration,
  Animated
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function VoiceScreen() {
  const router = useRouter();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [permission, setPermission] = useState<boolean | null>(null);
  
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      // Start pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Update duration
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      pulseAnim.setValue(1);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const requestPermission = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      setPermission(status === 'granted');
    } catch (error) {
      console.error('Permission error:', error);
      setPermission(false);
    }
  };

  const startRecording = async () => {
    try {
      if (!permission) {
        Alert.alert('Permission needed', 'Microphone access is required for voice notes');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
      setRecordingDuration(0);
      Vibration.vibrate(50);
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      
      const uri = recording.getURI();
      console.log('Recording saved to:', uri);
      
      Vibration.vibrate(100);
      
      Alert.alert(
        'Voice Note Saved!',
        `Recorded ${formatDuration(recordingDuration)}`,
        [
          { text: 'Record Another', style: 'default' },
          { text: 'Done', onPress: () => router.back() }
        ]
      );
      
      setRecording(null);
      setRecordingDuration(0);
    } catch (error) {
      console.error('Failed to stop recording:', error);
      Alert.alert('Error', 'Failed to save recording');
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (permission === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Requesting microphone permission...</Text>
      </View>
    );
  }

  if (permission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="mic-off" size={64} color="#ef4444" />
        <Text style={styles.permissionTitle}>Microphone Access Needed</Text>
        <Text style={styles.permissionText}>
          Bizzy needs microphone access to record voice notes
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color="#6b7280" />
        </TouchableOpacity>
        
        <Text style={styles.title}>Voice Note</Text>
        
        <View style={styles.placeholder} />
      </View>

      {/* Recording Status */}
      <View style={styles.statusContainer}>
        {isRecording ? (
          <>
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>Recording</Text>
            </View>
            <Text style={styles.duration}>{formatDuration(recordingDuration)}</Text>
          </>
        ) : (
          <>
            <Ionicons name="mic" size={32} color="#6b7280" />
            <Text style={styles.readyText}>Ready to record</Text>
          </>
        )}
      </View>

      {/* Main Recording Button */}
      <View style={styles.recordingContainer}>
        <Animated.View style={[styles.recordButtonContainer, { transform: [{ scale: pulseAnim }] }]}>
          <TouchableOpacity
            style={[
              styles.recordButton,
              isRecording ? styles.recordingButton : styles.readyButton
            ]}
            onPress={isRecording ? stopRecording : startRecording}
            activeOpacity={0.8}
          >
            <Ionicons 
              name={isRecording ? "stop" : "mic"} 
              size={48} 
              color="white" 
            />
          </TouchableOpacity>
        </Animated.View>
        
        <Text style={styles.recordHint}>
          {isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
        </Text>
      </View>

      {/* Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Voice Note Tips</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tip}>• Speak clearly and close to the microphone</Text>
          <Text style={styles.tip}>• Mention field names (NW14, SW22) for auto-tagging</Text>
          <Text style={styles.tip}>• Include weather conditions and observations</Text>
          <Text style={styles.tip}>• Notes are automatically transcribed and organized</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  permissionText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  placeholder: {
    width: 40,
  },
  statusContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    marginRight: 8,
  },
  recordingText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
  },
  duration: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    fontFamily: 'monospace',
  },
  readyText: {
    fontSize: 18,
    color: '#6b7280',
    marginTop: 8,
  },
  recordingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonContainer: {
    marginBottom: 24,
  },
  recordButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  readyButton: {
    backgroundColor: '#10b981',
  },
  recordingButton: {
    backgroundColor: '#ef4444',
  },
  recordHint: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  tipsContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  tipsList: {
    gap: 8,
  },
  tip: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});