import { useState } from 'react'
import * as Location from 'expo-location'

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
        console.log('위치 권한이 없습니다.')
        return
      }

      const { coords } = await Location.getCurrentPositionAsync({ accuracy: 6 })

      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
    } catch (error) {
      console.error('위치 정보를 가져오는 동안 오류가 발생했습니다.', error)
    }
  }
  return { location, fetchUserLocation }
}
