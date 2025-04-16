import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Easing, Dimensions } from 'react-native';
import { colors } from '@/constants';

const PloggingStatusText = () => {
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollAnim, {
        toValue: 1,
        duration: 10000, // Adjust duration for smooth scrolling
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [scrollAnim]);

  const translateX = scrollAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [screenWidth, -screenWidth], // Ensure continuous scrolling
  });

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.text,
          { transform: [{ translateX }], width: screenWidth }, // Pass screenWidth dynamically
        ]}
      >
        안전에 유의하세요. 작은 행동이 큰 변화를 만듭니다
      </Animated.Text>
      <Animated.Text
        style={[
          styles.text,
          { transform: [{ translateX }], width: screenWidth }, // Pass screenWidth dynamically
        ]}
      >
        안전에 유의하세요. 작은 행동이 큰 변화를 만듭니다
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 700,
    backgroundColor: colors.PRIMARY,
    paddingVertical: 15,
    width: '100%',
    overflow: 'hidden', // Ensure text doesn't overflow the container
    flexDirection: 'row', // Allow texts to scroll in a row
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
});

export default PloggingStatusText;
