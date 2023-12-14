import { useState } from 'react'
import * as Location from 'expo-location'
import { Alert } from 'react-native'

interface UserLocation {
  latitude: number
  longitude: number
}

export default function useUserLocation() {
  // 사용자의 위치 정보를 저장하기 위한 상태
  const [location, setLocation] = useState<UserLocation>({
    latitude: 0,
    longitude: 0,
  })

  /**
   * 위치 정보를 비동기적으로 가져오는 함수
   */
  const fetchUserLocation = async () => {
    try {
      // 위치 액세스를 위한 전경 권한 요청
      const { status } = await Location.requestForegroundPermissionsAsync()

      // 권한이 부여되지 않은 경우 처리
      if (status !== 'granted') {
        Alert.alert('GPS를 켜주세요.')
        return
      }

      /**
       * 사용자의 위치를 주어진 정확도로 업데이트하는 함수.
       *
       * @param {number} accuracy - 위치 업데이트에 대한 원하는 정확도.
       */
      const updateLocation = async (accuracy: number) => {
        // 지정된 정확도로 현재 위치 가져오기
        const { coords } = await Location.getCurrentPositionAsync({ accuracy })

        // 위치 상태 업데이트
        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        })
      }
      // 초기 정확도(3)로 위치 업데이트
      updateLocation(3)
      // 높은 정확도(6)로 위치 업데이트하여 정밀도 향상
      updateLocation(6)
    } catch (error) {
      Alert.alert("Can't find you", 'So sad')
    }
  }

  return { location, fetchUserLocation }
}
