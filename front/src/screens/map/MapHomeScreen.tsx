import { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import { colors } from '@/constants';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapStyle from '@/style/mapStyle';

function MapHomeScreen() {
  const mapRef = useRef<MapView | null>(null);
  const { userLocation, isUserLocationError } = useUserLocation();
  usePermission();

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
        customMapStyle={mapStyle}
      />
      <Pressable
        style={({ pressed }) => [
          styles.actionButton,
          pressed && styles.actionButtonPressed,
        ]}
      >
        <View style={styles.buttonBackground}>
        <MaterialIcons
          name="directions-run"
          color={colors.WHITE}
          size={50}
        />
          <Text style={styles.buttonText}>플로링 시작</Text>
        </View>
      </Pressable>
      <View>
        <Pressable style={styles.locationButton} onPress={handlePressUserLocation}>
            <MaterialIcons
              name="my-location"
              color={colors.WHITE}
              size={30}
            />
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
    shadowColor: colors.SECONDARY,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10, // Android 그림자
  },
  actionButtonPressed: {
    transform: [{ scale: 0.95 }], // 버튼을 눌렀을 때 약간 작아짐
  },
  buttonBackground: {
    backgroundColor: colors.PRIMARY, // 버튼 배경색
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: colors.WHITE, // 텍스트 색상
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  locationButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 40,
    right: 30,
    backgroundColor: colors.PRIMARY_DARK,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 100,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Android 그림자
  },
});

export default MapHomeScreen;
