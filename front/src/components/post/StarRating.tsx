import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface StarRatingProps {
  treeCount: number;
}

const StarRating = ({ treeCount }: StarRatingProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
        <Text style={styles.text}>오늘 나무 {treeCount}그루의 역할을 해냈어요.</Text>
        <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((rating) => (
            <MaterialIcons
            key={rating}
            name={'forest'}
            size={30}
            color={rating <= treeCount ? '#000000' : '#ffffff'}
            />
        ))}
        </View>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container:{
      backgroundColor: colors.PRIMARY,
      borderRadius: 15,
      padding: Dimensions.get('screen').height * 0.01,
    },
    text: {
    fontSize: 13,
    textAlign: 'center',
    color: colors[theme].UNCHANGE_BLACK,
    fontWeight: '800',
    marginBottom: Dimensions.get('screen').height * 0.01,
    },
    ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    },
});

export default StarRating;
