import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.35;
const ITEM_SPACING = (screenWidth - ITEM_WIDTH) / 2.45; // 중앙 정렬을 위해 다시 넓게 조정

type ImageType = {
  uri: string;
};

type CarouselProps = {
  images: ImageType[];
};

const ImgCoverFlow = ({ images }: CarouselProps) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * ITEM_WIDTH,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);


  return (
    <Animated.FlatList
      ref={flatListRef}
      data={images}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_WIDTH}
      decelerationRate="fast"
      bounces={false}
      contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      renderItem={({ item, index }) => {
        const inputRange = [
          (index - 1) * ITEM_WIDTH,
          index * ITEM_WIDTH,
          (index + 1) * ITEM_WIDTH,
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.2, 0.8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.2, 1, 0.2],
            extrapolate: 'clamp',
        });

        const translateX = scrollX.interpolate({
          inputRange,
          outputRange: [-ITEM_WIDTH * 0.3, 0, ITEM_WIDTH * 0.3], // 양옆 이미지가 중앙으로 끌려오게
          extrapolate: 'clamp',
        });

        const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [20, 0, 20], // 중앙은 그대로, 양옆은 아래로 20px
            extrapolate: 'clamp',
        });

          const animatedStyle = {
            transform: [{ scale }, { translateX }, { translateY }],
            opacity,
            height: screenHeight * 0.17,
            width: ITEM_WIDTH,
        };

        return (
          <View style={{ width: ITEM_WIDTH}}>
            <Animated.View
              style={[
                styles.imageContainer,
                animatedStyle,
              ]}
            >
              <Image source={{ uri: item.uri }} style={styles.image} />
            </Animated.View>
          </View>
        );
      }}
    />
  );
};

export default ImgCoverFlow;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 14,
    overflow: 'hidden',
    marginVertical: 27,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
