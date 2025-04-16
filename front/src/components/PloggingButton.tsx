import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useLoginStore from '@/store/useLoginStore';
import {usePloggingStateStore} from '@/store/usePloggingStore';

interface PloggingButtonProps {
  onPress?: () => void;
}
function PloggingButton ({ onPress }: PloggingButtonProps) {
  const isLoggedIn = useLoginStore(state => state.isLoggedIn);
  const startPlogging = usePloggingStateStore(state => state.startPlogging);
  const statePlogging = usePloggingStateStore(state => state.isPlogging);

  const handlePress = () => {
    startPlogging();
    if (onPress){onPress();}
  };

  return isLoggedIn ? (
    !statePlogging ? (
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

const styles = StyleSheet.create({
  actionButton: {
    borderRadius: 30,
    shadowColor: colors.SECONDARY,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
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
    color: colors.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noLogin: {
    backgroundColor: colors.PRIMARY,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: colors.SECONDARY,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
});

export default PloggingButton;
