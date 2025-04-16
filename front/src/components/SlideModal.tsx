import React, { useEffect } from 'react';
import { Modal, StyleSheet, View, Animated, TouchableWithoutFeedback, Text, Image } from 'react-native';
import { colors } from '@/constants';
import PloggingButton from '@/components/ploggingButton';
import { LatLng } from 'react-native-maps';
import recycleIcon from '@/assets/recycleIcon.png';
import trashcanIcon from '@/assets/trashcanIcon.png';

interface SlideModalProps {
  visible: boolean;
  onClose: () => void;
  selectedMarker: LatLng | null;
  userLogin: boolean;
  markerType?: 'recycle' | 'trash'; // Add markerType as an optional prop
}

function SlideModal({ visible, onClose, selectedMarker, userLogin, markerType }: SlideModalProps) {
  const slideAnim = React.useRef(new Animated.Value(300)).current; // Start below the screen

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0, // Slide to the visible position
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300, // Slide back below the screen
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 300, // Slide back below the screen
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose(); // Trigger the onClose callback after animation
    });
  };

  const getMarkerImage = () => {
    if (markerType === 'recycle'){return recycleIcon;}
    if (markerType === 'trash'){return trashcanIcon;}
    return null;
  };

  return (
    <Modal transparent visible={visible} animationType="none">
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.modalContent}>
            <View style={styles.content}>
            <Image source={getMarkerImage()} style={styles.markerImage} resizeMode="contain" />
            <View>
                <Text style={styles.title}>Marker Details</Text>
                {selectedMarker ? (
                    <>
                    <Text style={styles.details}>Latitude: {selectedMarker.latitude}</Text>
                    <Text style={styles.details}>Longitude: {selectedMarker.longitude}</Text>
                    </>
                ) : (
                    <Text style={styles.details}>No marker selected</Text>
                )}
            </View>
            </View>
            <View style={styles.contentPlogging}>
                <PloggingButton userLogin={userLogin} onPress={handleClose} />
            </View>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '35%',
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    },
  content: {
    justifyContent: 'center',
    gap: 40,
    flexDirection: 'row',
  },
  markerImage: {
    width: 100,
    height: 120,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
  },
  contentPlogging: {
    top: 20,
    alignItems: 'center',
    },
});

export default SlideModal;
