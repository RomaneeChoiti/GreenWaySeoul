import { Image, StyleSheet } from "react-native";
import { LatLng, Marker } from "react-native-maps";

interface CustomMarkerProps{
  coordinate: LatLng;
  type: 'trash' | 'recycle';
}

function CustomMarker({coordinate, type}: CustomMarkerProps) {
  return (
    <Marker coordinate={coordinate} >
      {type === 'trash' ? (
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