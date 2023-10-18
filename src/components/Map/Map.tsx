import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import useUserLocation from '../User/Usermaker'

export default function Map() {
  const { location, region, fetchUserLocation } = useUserLocation()

  useEffect(() => {
    fetchUserLocation()
  }, [])

  return (
    <MapView style={styles.map} region={region}>
      {location.latitude !== 0 && location.longitude !== 0 && (
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          image={require('../../../assets/myLocationIcon.png')}
        />
      )}
      <StatusBar style="auto" />
      <View style={styles.title}>
        <View style={styles.button}></View>
        <View style={styles.button}></View>
      </View>
    </MapView>
  )
}
const styles = StyleSheet.create({
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
