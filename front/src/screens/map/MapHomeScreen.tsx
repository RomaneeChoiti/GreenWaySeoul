import { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import { colors } from '@/constants';
import useUserLocation from '@/hooks/useUserLocation';

function MapHomeScreen() {
  const mapRef = useRef<MapView | null>(null);
  const { userLocation, isUserLocationError } = useUserLocation();

  const handlePressUserLocation = () => {
    if(isUserLocationError){
      // err
      return;
    }
      mapRef.current?.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

  };


  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        // showsMyLocationButton={true}
      />
      <Pressable
        style={({ pressed }) => [
          styles.actionButton,
          pressed && styles.actionButtonPressed,
        ]}
      >
        <View style={styles.buttonBackground}>
          <Text style={styles.buttonText}>산책하기</Text>
        </View>
      </Pressable>
      <View>
        <Pressable style={styles.locationButton} onPress={handlePressUserLocation}>
            <Text style={styles.buttonText}>내위치</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  actionButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 90,
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Android 그림자
  },
  actionButtonPressed: {
    transform: [{ scale: 0.95 }], // 버튼을 눌렀을 때 약간 작아짐
  },
  buttonBackground: {
    backgroundColor: colors.PRIMARY, // 버튼 배경색
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: colors.WHITE, // 텍스트 색상
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  locationButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 40,
    right: 30,
    backgroundColor: colors.PRIMARY,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 100,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Android 그림자
  },
});

export default MapHomeScreen;
