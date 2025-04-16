import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import { colors } from '@/constants';
import CustomButton from '@/components/CustomButton';
import { usePloggingStateStore } from '@/store/usePloggingStore';



const StopPloggingButton = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const stopPlogging = usePloggingStateStore((state) => state.stopPlogging);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    stopPlogging();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Pressable style={styles.stopPloggingButton} onPress={handlePress}>
        <Text style={styles.stopPloggingText}>플로깅 중단</Text>
      </Pressable>
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>플로깅을 중단 하겠습니까?</Text>
            <View style={styles.modalButtons}>
              <CustomButton
                label="예"
                variant="outlined"
                size="medium"
                onPress={handleConfirm}
              />
              <CustomButton
                label="아니오"
                variant="filled"
                size="medium"
                onPress={handleCancel}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  stopPloggingButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 100,
    backgroundColor: colors.ERROR,
    paddingVertical: 15,
    paddingHorizontal: 140,
    borderRadius: 20,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  stopPloggingText: {
    color: colors.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.WHITE,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 19,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default StopPloggingButton;
