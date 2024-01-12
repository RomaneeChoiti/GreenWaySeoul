import { useState } from 'react'
import * as Location from 'expo-location'
import { Alert } from 'react-native'
import { UserLocation } from '../Type'

export default function useUserLocation() {
  const [location, setLocation] = useState<UserLocation>({
    latitude: 0,
    longitude: 0,
  })

  const fetchUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert('GPS On.')
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
