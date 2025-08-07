import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { formatTime } from '@/utils/time';

interface TimerDisplayProps {
  timer: number;
}

function TimerDisplay({ timer }: TimerDisplayProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.timeContainer}>
      <Text style={styles.info}>Time</Text>
      <Text style={styles.time}>{formatTime(timer)}</Text>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    timeContainer: {
      alignItems: 'center',
    },
    info: {
      fontSize: 14,
      color: colors[theme].GRAY_700,
    },
    time: {
      fontSize: 30,
      fontWeight: '400',
      color: colors[theme].BLACK,
    },
  });

export default TimerDisplay;
