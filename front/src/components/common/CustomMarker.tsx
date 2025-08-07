import { Image, StyleSheet, Animated } from 'react-native';
import { LatLng, Marker } from 'react-native-maps';
import { useCallback, useEffect, useRef } from 'react';

interface CustomMarkerProps{
  coordinate: LatLng;
  markerType: 'trash' | 'recycle';
  isSelected?: boolean;
  onPress?: () => void;
}

function CustomMarker({coordinate, markerType, isSelected = false, onPress}: CustomMarkerProps) {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
  }, []);

  const startBounceAnimation = useCallback(() => {
    stopAnimation(); // 기존 애니메이션 정리

    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 6,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    );
    animationRef.current.start();
  }, [bounceAnim, stopAnimation]);

  const resetToOriginalPosition = useCallback(() => {
    stopAnimation(); // 기존 애니메이션 정리

    Animated.timing(bounceAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [bounceAnim, stopAnimation]);

  useEffect(() => {
    if (isSelected) {
      startBounceAnimation();
    } else {
      resetToOriginalPosition();
    }

    // 컴포넌트 언마운트 시 애니메이션 정리 - 안정적인 cleanup 함수
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, [isSelected, startBounceAnimation, resetToOriginalPosition]);

  return (
    <Marker
      coordinate={coordinate}
      onPress={onPress}
      anchor={{ x: 0.5, y: 1 }}
    >
      <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
        {markerType === 'trash' ? (
          <Image
              source={require('@/assets/trashcanIcon.png')}
              style={styles.img}
          />
        ) : (
          <Image
              source={require('@/assets/recycleIcon.png')}
              style={styles.img}
          />
        )}
      </Animated.View>
    </Marker>
  );
}

const styles = StyleSheet.create({
    img: {
        width: 50,
        height: 70,
    },
});

export default CustomMarker;
