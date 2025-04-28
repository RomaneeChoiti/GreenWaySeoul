import { Image, StyleSheet } from "react-native";
import { LatLng, Marker } from "react-native-maps";

interface CustomMarkerProps{
  coordinate: LatLng;
  markerType: 'trash' | 'recycle';
  onPress?: () => void;
}

function CustomMarker({coordinate, markerType, onPress}: CustomMarkerProps) {
  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      {markerType === 'trash' ? (
        <Image
            source={require('@/assets/trashcanIcon.png')} // Replace with actual user image URL
            style={styles.img}
        />
      ) : (
        <Image
            source={require('@/assets/recycleIcon.png')} // Replace with actual user image URL
            style={styles.img}
        />
      )}
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