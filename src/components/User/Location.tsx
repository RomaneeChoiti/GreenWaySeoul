import { useState } from 'react'
import * as Location from 'expo-location'
import { Alert } from 'react-native'
import { UserLocation } from '../Type'

export default function useUserLocation() {
  // 사용자의 위치 정보를 저장하기 위한 상태
  const [location, setLocation] = useState<UserLocation>({
    latitude: 0,
    longitude: 0,
  })

  const fetchUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert('GPS를 켜주세요.')
        return
      }
      const updateLocation = async (accuracy: number) => {
        const { coords } = await Location.getCurrentPositionAsync({ accuracy })

        if (
          coords.latitude !== location.latitude ||
          coords.longitude !== location.longitude
        ) {
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          })
        }
      }
      updateLocation(3)
      updateLocation(6)
    } catch (error) {
      Alert.alert("Can't find you", 'So sad')
    }
  }

  return { location, fetchUserLocation }
}
