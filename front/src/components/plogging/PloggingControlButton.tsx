import React from 'react';
import { Pressable, StyleSheet, Text, View, Dimensions } from 'react-native';
import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { usePloggingStateStore } from '@/store/usePloggingStore';
import { ThemeMode } from '@/types';
import useAuth from '@/hooks/queries/useAuth';

interface PloggingControlButtonProps {
  onStart: () => void;
  onStop: () => void;
}

function PloggingControlButton({ onStart, onStop }: PloggingControlButtonProps) {
  const { isLogin } = useAuth();
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const isPlogging = usePloggingStateStore(state => state.isPlogging);

  return (
    <View style={styles.buttonContainer}>
      {!isLogin ? (
        <View style={styles.buttonBackground}>
          <Text style={styles.noLoginText}>로그인 후 이용하시길 바랍니다</Text>
        </View>
      ) : !isPlogging ? (
        <Pressable
          onPress={onStart}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.actionButtonPressed,
          ]}
        >
          <View style={styles.buttonBackground}>
            <Text style={styles.buttonText}>START</Text>
          </View>
        </Pressable>
      ) : (
        <Pressable
          onPress={onStop}
          style={({ pressed }) => [
            styles.stopButton,
            pressed && styles.actionButtonPressed,
          ]}
        >
          <View style={styles.stopButtonBackground}>
            <Text style={styles.stopButtonText}>STOP</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    buttonContainer: {
      top: Dimensions.get('screen').height * 0.01,
      alignItems: 'center',
    },
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
      paddingVertical: Dimensions.get('screen').height * 0.01,
      paddingHorizontal: Dimensions.get('screen').width * 0.14,
      borderRadius: 15,
    },
    buttonText: {
      color: colors[theme].BLACK,
      fontSize: 30,
      fontWeight: '300',
    },
    noLoginText: {
      color: colors[theme].UNCHANGE_BLACK,
      fontSize: 14,
      fontWeight: '600',
      textAlign: 'center',
      padding: Dimensions.get('screen').height * 0.01,
    },
    stopButton: {
      borderRadius: 30,
    },
    stopButtonBackground: {
      backgroundColor: colors.WARNING,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: Dimensions.get('screen').height * 0.01,
      paddingHorizontal: Dimensions.get('screen').width * 0.14,
      borderRadius: 15,
    },
    stopButtonText: {
      color: colors[theme].WHITE,
      fontSize: 30,
      fontWeight: '300',
    },
  });

export default PloggingControlButton;
