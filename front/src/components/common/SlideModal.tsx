import React, { useEffect, useRef } from 'react';
import { Modal, StyleSheet, View, Animated, TouchableWithoutFeedback, Text, Image } from 'react-native';
import { colors } from '@/constants';
import PloggingButton from '@/components/plogging/PloggingButton';
import { ThemeMode, TrashcanData } from '@/types';
import { useThemeStore } from '@/store/useThemeStore';

interface SlideModalProps {
  visible: boolean;
  onClose: () => void;
  selectedMarker: TrashcanData | null;
  markerType?: 'recycle' | 'trash'; // Add markerType as an optional prop
}

function SlideModal({ visible, onClose, selectedMarker, markerType }: SlideModalProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  const slideAnim = useRef(new Animated.Value(300)).current; // Start below the screen

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
    return markerType === 'recycle'
      ? require('@/assets/recycleIcon.png')
      : require('@/assets/trashcanIcon.png');
  };

  return (
    <Modal transparent visible={visible} animationType="none">
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.modalContent}>
            <View style={styles.contentRow}>
              <View style={styles.imageContainer}>
                {getMarkerImage() ? (
                  <Image source={getMarkerImage()} style={styles.markerImage} resizeMode="contain" />
                ) : (
                  <Text style={styles.details}>No image available</Text>
                )}
              </View>
              <View style={styles.textContainer}>
                {selectedMarker ? (
                  <>
                    <Text style={styles.title}>{selectedMarker.Address}</Text>
                    <Text style={styles.details}>{selectedMarker.설치위치}</Text>
                    <Text style={styles.details}>{selectedMarker.canType}</Text>
                    <Text style={styles.warringTextTitle}>플로깅 주의 사항</Text>
                    <Text style={styles.warringTextDetails}>교통 안전 유의하시길 바랍니다.</Text>
                    <Text style={styles.warringTextDetails}>날카로운 물건 주의하시길 바랍니다.</Text>
                  </>
                ) : (
                    <Text style={styles.details}>No marker selected</Text>
                )}
              </View>
            </View>
            <View style={styles.contentPlogging}>
                <PloggingButton onPress={handleClose} />
            </View>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '35%',
    backgroundColor: colors[theme].WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: colors[theme].BLACK,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  markerImage: {
    width: 100,
    height: 120,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors[theme].BLACK,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
    color: colors[theme].BLACK,
  },
  contentPlogging: {
    top: 20,
    alignItems: 'center',
    },
  warringTextTitle:{
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.WARNING,
    marginTop: 10,
  },
  warringTextDetails:{
    fontSize: 14,
    color: colors[theme].GRAY_700,
  },
});

export default SlideModal;
