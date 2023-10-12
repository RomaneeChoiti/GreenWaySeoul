import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import * as Location from 'expo-location'

// import UserLocation from './components/User/Geolacation'

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

export default function App() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  })

  // 위치 정보를 비동기적으로 가져오는 함수
  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('위치 권한이 없습니다.')
        return
      }

      const { coords } = await Location.getCurrentPositionAsync({ accuracy: 5 })

      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
    } catch (error) {
      console.error('위치 정보를 가져오는 동안 오류가 발생했습니다.', error)
    }
  }

  useEffect(() => {
    getUserLocation() // 컴포넌트가 마운트될 때 위치 정보를 가져오도록 합니다.
  }, [])

  return (
    <View style={styles.continer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          image={require('../assets/myLocationIcon.png')}
        />
        <StatusBar style="auto" />
        <View style={styles.title}>
          <View style={styles.button}></View>
          <View style={styles.button}></View>
        </View>
      </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: 'green',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  title: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  button: {
    flex: 0.3,
    backgroundColor: 'white',
    height: '100%',
    marginHorizontal: 20,
  },
})
