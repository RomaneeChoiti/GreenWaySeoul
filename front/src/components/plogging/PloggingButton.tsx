import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useLoginStore from '@/store/useLoginStore';
import {usePloggingStateStore} from '@/store/usePloggingStore';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface PloggingButtonProps {
  onPress?: () => void;
}

function PloggingButton ({ onPress }: PloggingButtonProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const isLoggedIn = useLoginStore(state => state.isLoggedIn);
  const startPlogging = usePloggingStateStore(state => state.startPlogging);
  const isPlogging = usePloggingStateStore(state => state.isPlogging);

  const handlePress = () => {
    startPlogging();
    if (onPress){onPress();}
  };

  return isLoggedIn ? (
    !isPlogging ? (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.actionButton,
        pressed && styles.actionButtonPressed,
      ]}
    >
      <View style={styles.buttonBackground}>
        <Text style={styles.buttonText}>플로깅 시작하기</Text>
      </View>
    </Pressable>) :
    (
        <View style={styles.buttonBackground}>
          <Text style={styles.buttonText}>플로깅 중...</Text>
        </View>
    )
  ) : (
    <View style={styles.noLogin}>
      {/* TODO: {후순위} 버튼을 누르면 AUTH_HOME으로 설정 */}
      <Text style={styles.buttonText}>로그인 후 플로깅을 즐겨보세요</Text>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
  actionButton: {
    borderRadius: 30,
  },
  actionButtonPressed: {
    transform: [{ scale: 0.95 }],
  },
  buttonBackground: {
    backgroundColor: colors.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  buttonText: {
    color: colors[theme].UNCHANGE_WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noLogin: {
    backgroundColor: colors.PRIMARY,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
});

export default PloggingButton;
