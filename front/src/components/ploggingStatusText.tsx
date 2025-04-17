import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Easing, Dimensions } from 'react-native';
import { colors } from '@/constants';

interface PloggingStatusTextProps {
  isPlogging: boolean;
}

const PloggingStatusText: React.FC<PloggingStatusTextProps> = ({ isPlogging }) => {
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

  const renderScrollingText = (text: string) => (
    <Animated.Text
      style={[
        styles.text,
        { transform: [{ translateX }], width: screenWidth }, // Pass screenWidth dynamically
      ]}
    >
      {text}
    </Animated.Text>
  );

  const message = isPlogging
    ? "안전에 유의하세요. 작은 행동이 큰 변화를 만듭니다"
    : "쓰레기통을 클릭하여 플로깅을 시작해보세요";

  const containerStyle = [
    styles.container,
    { backgroundColor: isPlogging ? colors.ERROR : colors.PRIMARY }, // Dynamically set background color
  ];

  return (
    <View style={containerStyle}>
      {renderScrollingText(message)}
      {renderScrollingText(message)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 700,
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
