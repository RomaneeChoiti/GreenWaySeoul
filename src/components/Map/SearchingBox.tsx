import { useState } from 'react'
import { Animated } from 'react-native'

const [animatedContainerWidth] = useState(new Animated.Value(50))

export const containerWidth = animatedContainerWidth.interpolate({
  inputRange: [50, 90],
  outputRange: ['50%', '90%'],
})

export const ColoerAnime = (data: string | any[]) => {
  const toValue = data ? 80 : 50
  Animated.timing(animatedContainerWidth, {
    toValue,
    duration: 300,
    useNativeDriver: false,
  }).start()
}
