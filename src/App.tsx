import React from 'react'
import { StyleSheet, View } from 'react-native'
import Map from './components/Map/Map'

export default function App() {
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
