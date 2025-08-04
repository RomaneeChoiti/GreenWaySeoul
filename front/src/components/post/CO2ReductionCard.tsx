import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import { ThemeMode } from '@/types';

interface CO2ReductionCardProps {
  ploggingMinutes: number;
  co2Reduction: string;
  treeEquivalent: number;
  theme: ThemeMode;
}

function CO2ReductionCard({
  ploggingMinutes,
  co2Reduction,
  treeEquivalent,
  theme,
}: CO2ReductionCardProps) {
  const styles = styling(theme);

  return (
    <View style={[styles.fieldBox, styles.flexRow]}>
      <View style={styles.gap5}>
        <Text style={styles.floggingText}>
          플로깅을 <Text style={styles.highlightText}>{ploggingMinutes}</Text>분 하였군요.
        </Text>
        <Text style={styles.floggingText}>
          {ploggingMinutes}분은 탁소 약 <Text style={styles.highlightText}>{co2Reduction}kg</Text> 절감효과가 있습니다.
        </Text>
        <Text style={styles.floggingSmallText}>
          *나무 1그루가 하루 돈안 흡수하는 CO2 = 약 0.03~0.05kg입니다.
        </Text>
        <Text style={styles.floggingText}>
          오늘 하루 나무 <Text style={styles.highlightText}>{treeEquivalent}</Text>그루의 역할을 하였습니다.
        </Text>
      </View>
      <MaterialIcons name="forest" color={'black'} size={35} />
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    flexRow: {
      flexDirection: 'row',
    },
    fieldBox: {
      backgroundColor: colors[theme].WHITE,
      padding: Dimensions.get('screen').height * 0.025,
      borderRadius: 20,
    },
    gap5: {
      gap: Dimensions.get('screen').height * 0.005,
    },
    floggingText: {
      fontSize: 12,
      fontWeight: '700',
      color: colors[theme].BLACK,
    },
    highlightText: {
      fontSize: 15,
      fontWeight: '900',
      color: colors.DARK_PRIMARY,
    },
    floggingSmallText: {
      fontSize: 10,
      fontWeight: '700',
      color: colors[theme].BLACK,
    },
  });

export default CO2ReductionCard;
