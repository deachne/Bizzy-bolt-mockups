import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Vibration,
  Dimensions
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get('window');

export default function CameraScreen() {
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera" size={64} color="#10b981" />
        <Text style={styles.permissionTitle}>Camera Access Needed</Text>
        <Text style={styles.permissionText}>
          Bizzy needs camera access to capture field photos
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      Vibration.vibrate(100);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      if (photo) {
        // Save to app directory
        const fileName = `field_photo_${Date.now()}.jpg`;
        const newPath = `${FileSystem.documentDirectory}${fileName}`;
        
        await FileSystem.moveAsync({
          from: photo.uri,
          to: newPath,
        });

        Alert.alert(
          'Photo Captured!',
          'Field photo saved successfully',
          [
            { text: 'Take Another', style: 'default' },
            { text: 'Done', onPress: () => router.back() }
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to capture photo');
      console.error('Camera error:', error);
    } finally {
      setIsCapturing(false);
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      <CameraView 
        ref={cameraRef}
        style={styles.camera} 
        facing={facing}
      >
        {/* Top Controls */}
        <View style={styles.topControls}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.modeIndicator}>
            <Text style={styles.modeText}>Field Photo</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={toggleCameraFacing}
          >
            <Ionicons name="camera-reverse" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <View style={styles.captureContainer}>
            <TouchableOpacity
              style={[styles.captureButton, isCapturing && styles.capturingButton]}
              onPress={takePicture}
              disabled={isCapturing}
            >
              <View style={styles.captureInner} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.captureHint}>
            Tap to capture field observation
          </Text>
        </View>

        {/* Grid Lines */}
        <View style={styles.gridContainer}>
          <View style={[styles.gridLine, styles.gridVertical1]} />
          <View style={[styles.gridLine, styles.gridVertical2]} />
          <View style={[styles.gridLine, styles.gridHorizontal1]} />
          <View style={[styles.gridLine, styles.gridHorizontal2]} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
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
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeIndicator: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  modeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    alignItems: 'center',
  },
  captureContainer: {
    marginBottom: 16,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  capturingButton: {
    backgroundColor: 'rgba(16,185,129,0.5)',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  captureHint: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  gridContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  gridVertical1: {
    left: '33.33%',
    top: 0,
    bottom: 0,
    width: 1,
  },
  gridVertical2: {
    left: '66.66%',
    top: 0,
    bottom: 0,
    width: 1,
  },
  gridHorizontal1: {
    top: '33.33%',
    left: 0,
    right: 0,
    height: 1,
  },
  gridHorizontal2: {
    top: '66.66%',
    left: 0,
    right: 0,
    height: 1,
  },
});