import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text } from 'react-native'
import useUserLocation from '../User/Location'
import Loading from '../../Loading'

export default function Map() {
  const { location, fetchUserLocation } = useUserLocation()

  useEffect(() => {
    fetchUserLocation()
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
        image={require('../../../assets/myLocationIcon.png')}
      />

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
