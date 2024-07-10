import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Map from './src/components/Map/Map'
import * as SplashScreen from 'expo-splash-screen'

export default function App() {
  SplashScreen.preventAutoHideAsync()

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync()
    }, 3000)
  }, [])

  return (
    <View style={styles.continer}>
      <Map />
    </View>
  )
}
const styles = StyleSheet.create({
  continer: {
    flex: 1,
  },
})
