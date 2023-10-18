import { useState } from 'react'
import * as Location from 'expo-location'

interface UserLocation {
  latitude: number
  longitude: number
}

interface initialRegion {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}
export default function useUserLocation() {
  const [location, setLocation] = useState<UserLocation>({
    latitude: 37.57861,
    longitude: 126.97722,
  })

  const [region, setRegion] = useState<initialRegion>({
    latitude: 37.57861,
    longitude: 126.97722,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
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

      // 사용자 위치가 변경될 때마다 지도를 따라가도록 region 업데이트
      setRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.005, // 더 작은 값으로 설정하여 확대 수준을 높임
        longitudeDelta: 0.005, // 더 작은 값으로 설정하여 확대 수준을 높임
      })
    } catch (error) {
      console.error('위치 정보를 가져오는 동안 오류가 발생했습니다.', error)
    }
  }
  return { location, region, fetchUserLocation }
}
