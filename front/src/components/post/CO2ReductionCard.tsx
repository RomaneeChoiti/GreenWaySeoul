import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import { ThemeMode } from '@/types';

interface CO2ReductionCardProps {
  ploggingMinutes: number;
  treeEquivalent: number;
  theme: ThemeMode;
  deletePadding?: boolean;
  deleteLogo?: boolean;
}

function CO2ReductionCard({
  ploggingMinutes,
  treeEquivalent,
  theme,
  deletePadding = false,
  deleteLogo = false,

}: CO2ReductionCardProps) {
  const styles = styling(theme, deletePadding);

  // CO2 절감 효과 계산 (1분당 0.01kg로 가정)
  const co2ReductionValue = (ploggingMinutes * 0.01).toFixed(2);

  return (
    <View style={[styles.fieldBox, styles.flexRow]}>
      <View style={styles.gap5}>
        <Text style={styles.floggingText}>
          플로깅을 <Text style={styles.highlightText}>{ploggingMinutes}</Text>분 하였군요.
        </Text>
        <Text style={styles.floggingText}>
          {ploggingMinutes}분은 탄소 약 <Text style={styles.highlightText}>{co2ReductionValue}kg</Text> 절감효과가 있습니다.
        </Text>
        <Text style={styles.floggingSmallText}>
          *나무 1그루가 하루 동안 흡수하는 CO2는 약 0.03~0.06kg입니다.{'\n'}(0.03kg 기준으로 계산)
        </Text>
        <Text style={styles.floggingText}>
          오늘 하루 나무 <Text style={styles.highlightText}>{treeEquivalent}</Text>그루의 역할을 하였습니다.
        </Text>
      </View>
      {!deleteLogo && (
        <MaterialIcons name="forest" color={colors[theme].BLACK} size={35} />
      )}
    </View>
  );
}

const styling = (theme: ThemeMode, deletePadding: boolean) =>
  StyleSheet.create({
    flexRow: {
      flexDirection: 'row',
    },
    fieldBox: {
      backgroundColor: colors[theme].WHITE,
      padding: Dimensions.get('screen').height * 0.025,
      ...(deletePadding ? {paddingBottom: 0} : {}),
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
