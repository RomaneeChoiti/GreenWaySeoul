import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Easing, Dimensions } from 'react-native';
import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface PloggingStatusTextProps {
  isPlogging: boolean;
}

const PloggingStatusText = ({ isPlogging }: PloggingStatusTextProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  const scrollAnim = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollAnim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [scrollAnim]);

  const translateX = scrollAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [screenWidth, -screenWidth],
  });

  const renderScrollingText = (text: string) => (
    <Animated.Text
      style={[
        styles.text,
        {
          transform: [{ translateX }],
          width: screenWidth,
          color: isPlogging ? colors[theme].UNCHANGE_WHITE : colors[theme].BLACK, // Change color based on plogging state
        },
      ]}
    >
      {text}
    </Animated.Text>
  );  const message = isPlogging
    ? '안전에 유의하세요. 작은 행동이 큰 변화를 만듭니다'
    : '쓰레기통을 클릭하여 플로깅을 시작해보세요';

  const containerStyle = [
    styles.container,
    { backgroundColor: isPlogging ? colors.WARNING : colors.PRIMARY },
    isPlogging && styles.bottomPosition, // Add bottom positioning when plogging
  ];

  return (
    <View style={containerStyle}>
      {renderScrollingText(message)}
      {renderScrollingText(message)}
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
  container: {
    marginTop: Dimensions.get('screen').height * 0.01,
    alignSelf: 'center',
    paddingVertical: Dimensions.get('screen').height * 0.025,
    width: '88%',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  bottomPosition: {
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.3,
    marginTop: 0,
    paddingVertical: Dimensions.get('screen').height * 0.015,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors[theme].BLACK,
  },
});

export default PloggingStatusText;
