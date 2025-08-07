import { Image, StyleSheet, Animated } from 'react-native';
import { LatLng, Marker } from 'react-native-maps';
import { useEffect, useRef } from 'react';

interface CustomMarkerProps{
  coordinate: LatLng;
  markerType: 'trash' | 'recycle';
  isSelected?: boolean;
  onPress?: () => void;
}

function CustomMarker({coordinate, markerType, isSelected = false, onPress}: CustomMarkerProps) {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    // 이전 애니메이션이 있다면 정지
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }

    if (isSelected) {
      // 상하로 움직이는 애니메이션 (아래로 움직이도록 변경)
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
    } else {
      // 애니메이션 정지하고 원래 위치로 복원
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    // 컴포넌트 언마운트 시 애니메이션 정리
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, [isSelected, bounceAnim]);

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
