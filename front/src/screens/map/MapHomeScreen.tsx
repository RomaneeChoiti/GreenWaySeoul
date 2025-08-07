import { useState, useEffect, useRef } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import MapView, { LatLng, PROVIDER_GOOGLE } from 'react-native-maps';
import { colors } from '@/constants';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapStyle from '@/style/mapStyle';
import CustomMarker from '@/components/common/CustomMarker';
import SlideModal from '@/components/common/SlideModal';
import PloggingStatusText from '@/components/plogging/PloggingStatusText';
import testData from '@/api/testData.json';
import { usePloggingStateStore } from '@/store/usePloggingStore';
import { useTrashcanStore } from '@/store/useTrashcanStore';
import { TrashcanData } from '@/types';
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
  const [selectedMarker, setSelectedMarker] = useState<TrashcanData | null>(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const [markerType, setMarkerType] = useState<'recycle' | 'trash'>();
  const isPlogging = usePloggingStateStore((state) => state.isPlogging);
  const prevIsPloggingRef = useRef(isPlogging);
  const userLocationRef = useRef(userLocation);
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
    data: TrashcanData,
    index: number) => {

    setSelectedMarker(data);
    setSelectedMarkerId(index);
    setMarkerType(type);
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
    setSelectedMarkerId(null);
  };

  // userLocation이 변경될 때마다 ref 업데이트
  useEffect(() => {
    userLocationRef.current = userLocation;
  }, [userLocation]);

  // 플로깅이 시작될 때만 유저 위치로 이동 (false -> true 변경 시에만)
  useEffect(() => {
    const prevIsPlogging = prevIsPloggingRef.current;
    
    // isPlogging이 false에서 true로 변경된 경우에만 실행
    if (!prevIsPlogging && isPlogging) {
      const currentLocation = userLocationRef.current;
      // userLocation이 유효한지 확인 후 moveMapView 호출
      if (currentLocation && currentLocation.latitude && currentLocation.longitude) {
        moveMapView(currentLocation);
      }
    }
    
    // 현재 상태를 이전 상태로 업데이트
    prevIsPloggingRef.current = isPlogging;
  }, [isPlogging, moveMapView]);
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
      <PloggingStatusText isPlogging={isPlogging} />
        {testData.map((data, index) => (
          <CustomMarker
            key={index}
            coordinate={{ latitude: data.Latitude, longitude: data.Longitude }}
            markerType={data.canType === '재활용' ? 'recycle' : 'trash'}
            isSelected={selectedMarkerId === index}
            onPress={() =>
              handleMarkerPress(
                { latitude: data.Latitude, longitude: data.Longitude },
                data.canType === '재활용' ? 'recycle' : 'trash',
                data,
                index,
              )
            }
          />
        ))}
      </MapView>
      <View>
          <Pressable style={styles.locationButton} onPress={handlePressUserLocation}>
            <MaterialIcons name="my-location" color={styles.iconColor.color} size={30} />
          </Pressable>
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
    color: colors[theme].BLACK,
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
    bottom: Dimensions.get('window').height * 0.07,
    right: Dimensions.get('window').width * 0.05,
    backgroundColor: colors.PRIMARY,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 100,
    shadowColor: colors[theme].BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MapHomeScreen;
