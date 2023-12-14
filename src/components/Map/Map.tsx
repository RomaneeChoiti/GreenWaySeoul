import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import useUserLocation from '../User/Location'
import Loading from '../../Loading'
import filteredTrashCanData from '../../api/TrashcanAPI'

interface UserLocation {
  latitude: number
  longitude: number
}

interface TrashCanData {
  Address: string
  Latitude: number
  Longitude: number
  canType: string
  distance: number
}

export default function Map() {
  const { location, fetchUserLocation } = useUserLocation()
  const [trashCanData, setTrashCanData] = useState<TrashCanData[]>([])

  const fetchTrashCanData = async ({
    location,
  }: {
    location: UserLocation
  }) => {
    try {
      const data = await filteredTrashCanData({ location })
      console.log('data length: ', data)
      setTrashCanData(data)
    } catch (err) {
      console.error(err)
    }
  }

  const executeStep = async () => {
    await fetchUserLocation()
    console.log('1-2. User location', location.latitude, location.longitude)
    await fetchTrashCanData({ location })
    console.log('2. TrashCanData')
  }

  useEffect(() => {
    executeStep()
  }, [])

  if (location.latitude === 0 && location.longitude === 0) {
    return <Loading />
  }

  return (
    <MapView style={styles.map}>
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        image={require('../../../assets/UserLocationIcon.png')}
      />
      {trashCanData.map((trashCan, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: trashCan.Latitude,
            longitude: trashCan.Longitude,
          }}
          image={require('../../../assets/TrashCanIcon.png')}
        />
      ))}
      <StatusBar style="auto" />
      <View style={styles.title}>
        <View style={styles.button}></View>
        <View style={styles.button}></View>
      </View>
    </MapView>
  )
}

const styles = StyleSheet.create({
  Loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
