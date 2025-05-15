import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import { colors, mapNavigations } from '@/constants';
import CustomButton from '@/components/common/CustomButton';
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
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        {/*
            TODO: 플로깅 중단 시 플로깅 기록 저장하는 로직 추가
            예 버튼 Click 시
            시스템에서 기록해주는 것
              1. 시간 시간
              2. 종료 시간
              3. 이동 거리 (챌린지)

            강의에서 제공하는 것
              1. 제목, 내용 (기록)
              2. 평점
              3. 사진
            사용자가 기록하는 것
        */}

        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>플로깅을 중단 하겠습니까?</Text>
            <View style={styles.modalButtons}>
              <CustomButton
                label="예"
                variant="outlined"
                size="medium"
                onPress={handleAddPost}
              />
              <CustomButton
                label="아니오"
                variant="outlined"
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

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    stopPloggingButton: {
      position: 'absolute',
      alignSelf: 'center',
      bottom: 100,
      backgroundColor: colors.PRIMARY, // Updated to use theme-based color
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
      color: colors[theme].UNCHANGE_WHITE, // Updated to use theme-based color
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
      backgroundColor: colors[theme].WHITE, // Updated to use theme-based color
      padding:20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },
    modalText: {
      fontSize: 19,
      marginBottom: 20,
      color: colors[theme].BLACK, // Updated to use theme-based color
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
});

export default StopPloggingButton;
