import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { mapNavigations } from '@/constants';
import { usePloggingStateStore } from '@/store/usePloggingStore';

interface UsePloggingHandlersProps {
  onClose: () => void;
  slideDown: (callback?: () => void) => void;
  resetTimer: () => void;
  startTimer: () => void;
}

export function usePloggingHandlers({ onClose, slideDown, resetTimer, startTimer }: UsePloggingHandlersProps) {
  const [isStopModalVisible, setIsStopModalVisible] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<MapStackParamList>>();
  const startPlogging = usePloggingStateStore(state => state.startPlogging);
  const stopPlogging = usePloggingStateStore(state => state.stopPlogging);
  const isPlogging = usePloggingStateStore(state => state.isPlogging);

  const handleStartTimer = () => {
    startTimer();
    startPlogging();
  };

  const handleStopPress = () => {
    setIsStopModalVisible(true);
  };

  const handleStopConfirm = () => {
    resetTimer();
    stopPlogging();
    setIsStopModalVisible(false);

    slideDown(() => {
      onClose();
      navigation.navigate(mapNavigations.ADD_POST);
    });
  };

  const handleStopCancel = () => {
    setIsStopModalVisible(false);
  };

  const handleClose = () => {
    if (isPlogging) {
      return;
    }

    slideDown(() => {
      onClose();
    });
  };

  return {
    isStopModalVisible,
    isPlogging,
    handleStartTimer,
    handleStopPress,
    handleStopConfirm,
    handleStopCancel,
    handleClose,
  };
}
