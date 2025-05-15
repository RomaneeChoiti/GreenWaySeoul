import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, mapNavigations } from '@/constants';
import ModalComponent from '@/components/common/ModalComponent';
import { usePloggingStateStore } from '@/store/usePloggingStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

const StopPloggingButton = () => {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  const [isModalVisible, setModalVisible] = useState(false);
  const stopPlogging = usePloggingStateStore((state) => state.stopPlogging);
  const navigation = useNavigation<NativeStackNavigationProp<MapStackParamList>>();

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleAddPost = () =>{
    stopPlogging();
    setModalVisible(false);
    navigation.navigate(mapNavigations.ADD_POST);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Pressable style={styles.stopPloggingButton} onPress={handlePress}>
        <Text style={styles.stopPloggingText}>플로깅 중단</Text>
      </Pressable>
      <ModalComponent
        visible={isModalVisible}
        message="플로깅을 중단 하겠습니까?"
        onConfirm={handleAddPost}
        onCancel={handleCancel}
      />
    </>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    stopPloggingButton: {
      position: 'absolute',
      alignSelf: 'center',
      bottom: 100,
      backgroundColor: colors.PRIMARY,
      paddingVertical: 15,
      paddingHorizontal: 140,
      borderRadius: 20,
      shadowColor: colors[theme].BLACK,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    stopPloggingText: {
      color: colors[theme].UNCHANGE_WHITE,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
});

export default StopPloggingButton;
