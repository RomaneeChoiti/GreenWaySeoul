import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import useUserLocation from '../User/Location'
import Loading from '../../Loading'
import fetchFilteredTrashCans from '../../api/TrashcanAPI'
import { UserLocation, TrashCanData, GyroscopeData } from '../Type'
import TypeDivide from '../Trashcan/TypeDivide'
import { DeviceMotion } from 'expo-sensors'
import { handleUserMarkerRotation } from '../User/Direction'

export default function Map() {
  const { location, fetchLocation, userLocation } = useUserLocation()
  const [trashCanData, setTrashCanData] = useState<TrashCanData[]>([])
  const [gyroscopeData, setGyroscopeData] = useState<GyroscopeData>({
    rotation: {
      alpha: 0,
      beta: 0,
      gamma: 0,
    },
  })

  useEffect(() => {
    const subscription = DeviceMotion.addListener(({ rotation }) => {
      setGyroscopeData({ rotation })
    })
    return () => {
      subscription.remove()
    }
  }, [])

  const fetchTrashCanData = async ({
    location,
  }: {
    location: UserLocation
  }) => {
    try {
      const data = await fetchFilteredTrashCans({ location })
      setTrashCanData(data!)
    } catch (err) {
      console.error(err)
    }
  }

  const executeStep = async () => {
    try {
      await fetchLocation()
      await fetchTrashCanData({ location })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await executeStep()
    }
    fetchData()
  }, [location])

  if (location.latitude === 0 && location.longitude === 0) {
    return <Loading />
  }

  return (
    <MapView style={styles.map}>
      <Marker
        coordinate={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }}
        image={require('../../../assets/userDirectionMarker.png')}
        style={handleUserMarkerRotation(gyroscopeData)}
      />

      {trashCanData! &&
        trashCanData.map((trashCan, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: trashCan.Latitude,
              longitude: trashCan.Longitude,
            }}
            image={TypeDivide(trashCan.canType)}
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
