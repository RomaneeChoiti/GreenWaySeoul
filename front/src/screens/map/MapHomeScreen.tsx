import { useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import MapView, { LatLng, PROVIDER_GOOGLE } from 'react-native-maps';
import { colors } from '@/constants';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapStyle from '@/style/mapStyle';
import CustomMarker from '@/components/CustomMarker';
import SlideModal from '@/components/SlideModal';
import StopPloggingButton from '@/components/StopPloggingButton';
import PloggingStatusText from '@/components/PloggingStatusText';
import testData from '@/api/testData.json';
import { usePloggingStateStore } from '@/store/usePloggingStore';
import { useTrashcanStore } from '@/store/useTrashcanStore';
import { TrashcanData } from '@/types/domain';

function MapHomeScreen() {
  const mapRef = useRef<MapView | null>(null);
  const { userLocation, isUserLocationError } = useUserLocation();
  usePermission();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<LatLng | null>(null);
  const [markerType, setMarkerType] = useState<'recycle' | 'trash'>();
  const isPlogging = usePloggingStateStore((state) => state.isPlogging);
  const setTrashcanInfo = useTrashcanStore((state) => state.setTrashcanInfo);

  const moveMapView = (coordinate: LatLng) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      // err
      return;
    }
    moveMapView(userLocation);
  };

  const handleMarkerPress = (coordinate: LatLng, type: 'recycle' | 'trash', data: TrashcanData) => {
    setSelectedMarker(coordinate);
    setMarkerType(type);
    setTrashcanInfo(data.설치위치, data.Address, data.canType); // Store marker info
    setModalVisible(true);
    moveMapView(coordinate);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMarker(null);
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
      >
        {testData.map((data, index) => (
          <CustomMarker
            key={index}
            coordinate={{ latitude: data.Latitude, longitude: data.Longitude }}
            markerType={data.canType === '재활용' ? 'recycle' : 'trash'}
            onPress={() =>
              handleMarkerPress(
                { latitude: data.Latitude, longitude: data.Longitude },
                data.canType === '재활용' ? 'recycle' : 'trash',
                data // Pass marker data
              )
            }
          />
        ))}
      </MapView>

      <View>
        <PloggingStatusText isPlogging={isPlogging} />
        {!isPlogging ? (
          <Pressable style={styles.locationButton} onPress={handlePressUserLocation}>
            <MaterialIcons name="my-location" color={colors.WHITE} size={30} />
          </Pressable>
        ) : (
          <StopPloggingButton />
        )}
      </View>
      <SlideModal
        visible={isModalVisible}
        onClose={closeModal}
        selectedMarker={selectedMarker}
        markerType={markerType}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonBackground: {
    backgroundColor: colors.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: colors.WHITE,
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
    elevation: 5,
  },
});

export default MapHomeScreen;
