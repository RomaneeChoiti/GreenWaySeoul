import React from 'react';
import { Modal, StyleSheet, View, TouchableWithoutFeedback, Dimensions, Animated } from 'react-native';
import { colors } from '@/constants';
import { ThemeMode, TrashcanData } from '@/types';
import { useThemeStore } from '@/store/useThemeStore';
import ModalComponent from '@/components/common/ModalComponent';
import TimerDisplay from '@/components/plogging/TimerDisplay';
import MarkerInfo from '@/components/plogging/MarkerInfo';
import PloggingControlButton from '@/components/plogging/PloggingControlButton';
import { useTimer } from '@/hooks/useTimer';
import { useSlideAnimation } from '@/hooks/useSlideAnimation';
import { usePloggingHandlers } from '@/hooks/usePloggingHandlers';

interface SlideModalProps {
  visible: boolean;
  onClose: () => void;
  selectedMarker: TrashcanData | null;
  markerType?: 'recycle' | 'trash'; // Add markerType as an optional prop
}

function SlideModal({ visible, onClose, selectedMarker, markerType }: SlideModalProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  const { timer, startTimer, resetTimer } = useTimer();
  const { slideAnim, slideDown } = useSlideAnimation(visible);
  const {
    isStopModalVisible,
    handleStartTimer,
    handleStopPress,
    handleStopConfirm,
    handleStopCancel,
    handleClose,
  } = usePloggingHandlers({ onClose, slideDown, resetTimer, startTimer });

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.backdrop}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.backdropTouchable} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.modalContent}>
            <MarkerInfo selectedMarker={selectedMarker} markerType={markerType} />
            <TimerDisplay timer={timer} />
            <PloggingControlButton onStart={handleStartTimer} onStop={handleStopPress} />
          </View>
        </Animated.View>
      </View>
      <ModalComponent
        visible={isStopModalVisible}
        message="플로깅을 중단 하겠습니까?"
        onConfirm={handleStopConfirm}
        onCancel={handleStopCancel}
      />
    </Modal>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backdropTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: Dimensions.get('window').height * 0.1,
  },
  modal: {
    position: 'absolute',
    width: '90%',
    bottom: Dimensions.get('window').height * 0.03,
    backgroundColor: colors[theme].WHITE,
    borderRadius: 20,
    alignSelf: 'center',
  },
  modalContent:{
    padding: Dimensions.get('screen').width * 0.07,
  },
});

export default SlideModal;
