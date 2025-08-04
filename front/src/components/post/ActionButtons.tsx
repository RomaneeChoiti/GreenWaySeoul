import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '@/components/common/CustomButton';
import { colors } from '@/constants';
import { ThemeMode } from '@/types';

interface ActionButtonsProps {
  onCancel: () => void;
  onSubmit: () => void;
  theme: ThemeMode;
}

function ActionButtons({ onCancel, onSubmit, theme }: ActionButtonsProps) {
  const styles = styling();

  return (
    <View style={styles.buttonContainer}>
      <CustomButton
        label="취소"
        size="medium"
        backgroundColor={colors[theme].UNCHANGE_WHITE}
        textColor="black"
        onPress={onCancel}
      />
      <CustomButton
        label="등록"
        size="medium"
        backgroundColor={colors[theme].UNCHANGE_WHITE}
        textColor="black"
        onPress={onSubmit}
      />
    </View>
  );
}

const styling = () =>
  StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      gap: 10,
    },
  });

export default ActionButtons;
