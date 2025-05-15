import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import MapView, { LatLng, PROVIDER_GOOGLE } from 'react-native-maps';
import { colors } from '@/constants';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapStyle from '@/style/mapStyle';
import CustomMarker from '@/components/common/CustomMarker';
import SlideModal from '@/components/common/SlideModal';
import StopPloggingButton from '@/components/plogging/StopPloggingButton';
import PloggingStatusText from '@/components/plogging/PloggingStatusText';
import testData from '@/api/testData.json';
import { usePloggingStateStore } from '@/store/usePloggingStore';
import { useTrashcanStore } from '@/store/useTrashcanStore';
import { TrashcanData } from '@/types/domain';
import useMoveMapView from '@/hooks/useMoveMapView';
import Toast from 'react-native-toast-message';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

function MapHomeScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const { userLocation, isUserLocationError } = useUserLocation();
  usePermission('LOCATION');

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<LatLng | null>(null);
  const [markerType, setMarkerType] = useState<'recycle' | 'trash'>();
  const isPlogging = usePloggingStateStore((state) => state.isPlogging);
  const setTrashcanInfo = useTrashcanStore((state) => state.setTrashcanInfo);
  const {mapRef, moveMapView} = useMoveMapView();

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      Toast.show({
        type: 'error',
        text1: '위치 권한을 허용해주세요.',
        position: 'bottom',
      });
      return;
    }
    moveMapView(userLocation);
  };

  const handleMarkerPress = (
    coordinate: LatLng,
    type: 'recycle' | 'trash',
    data: TrashcanData) => {

    setSelectedMarker(coordinate);
    setMarkerType(type);
    // TODO: 스프레드 연산자를 사용하여 data를 펼쳐서 setTrashcanInfo에 전달
    setTrashcanInfo(
        data.설치위치,
        data.Address,
        data.canType,
        data.Latitude,
        data.Longitude,
    );
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
        region={{...userLocation, latitudeDelta: 0.01, longitudeDelta: 0.01}}
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
                data,
              )
            }
          />
        ))}
      </MapView>

      <View>
        <PloggingStatusText isPlogging={isPlogging} />
        {!isPlogging ? (
          <Pressable style={styles.locationButton} onPress={handlePressUserLocation}>
            <MaterialIcons name="my-location" color={styles.iconColor.color} size={30} />
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

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
  container: {
    flex: 1,
  },
  iconColor:{
    color: colors[theme].UNCHANGE_WHITE,
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
    color: colors[theme].WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  locationButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 40,
    right: 30,
    backgroundColor: colors.PRIMARY,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 100,
    shadowColor: colors[theme].BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default MapHomeScreen;
