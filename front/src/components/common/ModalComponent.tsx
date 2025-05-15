import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import CustomButton from '@/components/common/CustomButton';
import { useThemeStore } from '@/store/useThemeStore';
import { colors } from '@/constants';
import { ThemeMode } from '@/types';

interface ModalComponentProps {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ModalComponent({ visible, message, onConfirm, onCancel }: ModalComponentProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onCancel}>
        <View style={styles.modalContainer}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <CustomButton label="아니요" variant="outlined" size="medium" onPress={onCancel} />
            <CustomButton label="확인" variant="outlined" size="medium" onPress={onConfirm} />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: colors[theme].WHITE,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      width: '80%',
      shadowColor: colors[theme].BLACK,
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 5,
    },
    message: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
      color: colors[theme].BLACK,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 5,
    },
  });

export default ModalComponent;
