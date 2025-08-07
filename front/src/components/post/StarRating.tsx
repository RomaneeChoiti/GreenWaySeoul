import { colors, numbers } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


interface StarRatingProps {
  treeCount: number;
  showBackground?: boolean;
  showText?: boolean;
  tightLogo?: boolean;
}

const StarRating = ({ treeCount, showBackground = true, showText = true, tightLogo = false }: StarRatingProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme, showBackground, tightLogo);

  return (
    <View style={styles.container}>
      {showText &&
        <Text style={styles.text}>나무 {treeCount}그루의 역할을 해냈어요.</Text>}
        <View style={styles.ratingContainer}>
        {Array.from({ length: numbers.MAX_TREES }, (_, i) => i + 1).map((rating) => (
            <MaterialIcons
            key={rating}
            name={'forest'}
            size={30}
            color={rating <= treeCount ?
              (showBackground ? '#000000' : colors.PRIMARY) :
              (showBackground ? '#ffffff' : colors[theme].GRAY_500)
            }
            />
        ))}
        </View>
    </View>
  );
};

const styling = (theme: ThemeMode, showBackground: boolean, tightLogo: boolean) =>
  StyleSheet.create({
    container:{
      backgroundColor: showBackground ? colors.PRIMARY : 'transparent',
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
      ...(tightLogo ? { gap: 5 } : { gap: 10 }), // If tightLogo is true, use a smaller gap (5); otherwise, use a larger gap (10)
    },
});

export default StarRating;
