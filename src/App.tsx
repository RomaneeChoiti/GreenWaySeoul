import React from 'react'
import MapView from 'react-native-maps'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.continer}>
      <MapView style={styles.map}>
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
