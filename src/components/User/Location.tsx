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
        Alert.alert('GPS를 켜주세요.')
        return
      }
      // 정확도(accuracy)초기값을 3으로 설정, 6의 정확도가 달성되면 위치를 업데이트
      // 1. 컴포넌트화 하기
      const updateLocation = async (accuracy: number) => {
        const { coords } = await Location.getCurrentPositionAsync({ accuracy })
        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        })
      }
      updateLocation(3)
      updateLocation(6)
    } catch (error) {
      Alert.alert("Can't find you", 'So sad')
    }
  }

  return { location, fetchUserLocation }
}
