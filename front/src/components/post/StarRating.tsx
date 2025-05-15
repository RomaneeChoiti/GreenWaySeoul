import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface StarRatingProps {
  score: number;
  onRate: (rating: number) => void;
}

const StarRating = ({ score, onRate }: StarRatingProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <View>
        <Text style={styles.text}>오늘의 플로깅 점수를 매겨보세요!</Text>
        <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((rating) => (
            <Ionicons
            key={rating}
            name={rating <= score ? 'trash-sharp' : 'trash-outline'}
            size={50}
            color={rating <= score ? colors.PRIMARY : styles.iconColor.color}
            onPress={() => onRate(rating)}
            />
        ))}
        </View>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    text: {
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
    color: colors[theme].BLACK,
    },
    ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
    },
    iconColor:{
      color: colors[theme].GRAY_500,
    },
});

export default StarRating;
