import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { Alert } from 'react-native'
import { UserLocation } from '../Type'

export default function useUserLocation() {
  const [location, setLocation] = useState<UserLocation>({
    latitude: 0,
    longitude: 0,
  })
  const [userLocation, setUserLocation] = useState<UserLocation>({
    latitude: 0,
    longitude: 0,
  })

    // 권한 상태를 추적
    const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null);


  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()


  // 권한 상태 저장
  setPermissionStatus(status);

      if (status !== 'granted') {
        Alert.alert('GPS On.')
        return 
      }

      const { coords } = await Location.getCurrentPositionAsync({ accuracy: 3 })

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
        },
        (location: Location.LocationObject) => {
          setUserLocation({
            // latitude: location.coords.latitude,
            // longitude: location.coords.longitude,
            latitude: 37.513835,
            longitude: 127.104434 ,
          })
        },
      )

      if (
        coords.latitude !== location.latitude ||
        coords.longitude !== location.longitude
      ) {
        setLocation({
          // latitude: coords.latitude,
          // longitude: coords.longitude,
          latitude: 37.513835,
          longitude: 127.104434 ,
        })
      }
    } catch (error) {
      Alert.alert("Can't find you", 'So sad')
    }
  }

  useEffect(() => {
    const checkPermissionStatus = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      setPermissionStatus(status);

      if (status === Location.PermissionStatus.GRANTED) {
        fetchLocation();
      }
    };

    checkPermissionStatus();
  }, []);

  return { location, fetchLocation, userLocation }
}
