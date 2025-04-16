import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { LatLng } from 'react-native-maps';
import useAppState from './useAppState';
import { useLocationStore } from '@/store/useLocationStore';

function useUserLocation(){
  const [userLocation, setUserLocation] = useState<LatLng>({ latitude: 37.5779, longitude: 126.9769 });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const { isComeback } = useAppState();
  const setUserLocationInStore = useLocationStore((state: { setUserLocation: (location: LatLng) => void }) => state.setUserLocation);

    useEffect(() => {
        Geolocation.getCurrentPosition(info =>{
          const { latitude, longitude } = info.coords;
          const newLocation = { latitude, longitude };
          setUserLocation(newLocation);
          setUserLocationInStore(newLocation);
          setIsUserLocationError(false);
        },
        () => {
          setIsUserLocationError(true);
        },{
          enableHighAccuracy: true,
        });
      }, [isComeback, setUserLocationInStore]);

      return { userLocation, isUserLocationError };
}

export default useUserLocation;