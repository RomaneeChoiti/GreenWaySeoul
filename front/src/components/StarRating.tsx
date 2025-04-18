import { colors } from '@/constants';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface StarRatingProps {
  score: number;
  onRate: (rating: number) => void;
}

const StarRating = ({ score, onRate }: StarRatingProps) => {
  return (
    <View>
        <Text style={styles.text}>오늘의 플로깅 점수를 매겨보세요!</Text>
        <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((rating) => (
            <Ionicons
            key={rating}
            name={rating <= score ? 'trash-sharp' : 'trash-outline'}
            size={50}
            color={rating <= score ? colors.PRIMARY : 'gray'}
            onPress={() => onRate(rating)}
            />
        ))}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    text: {
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
    },
    ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
    },
});

export default StarRating;
