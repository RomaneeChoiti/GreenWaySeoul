import { useState } from 'react'
import * as Location from 'expo-location'
import { Alert } from 'react-native'

interface UserLocation {
  latitude: number
  longitude: number
}

export default function useUserLocation() {
  const [location, setLocation] = useState<UserLocation>({
    latitude: 0,
    longitude: 0,
  })

  // 위치 정보를 비동기적으로 가져오는 함수
  const fetchUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert('GPS X -> GPS OK')
        return
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: 3,
      })

      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
    } catch (error) {
      Alert.alert("Can't find you", 'So sad')
    }
  }

  return { location, fetchUserLocation }
}
