import React from 'react'
import { StyleSheet, View } from 'react-native'
import Map from './src/components/Map/Map'
// import { Amplify } from 'aws-amplify'
// // import amplifyconfig from 'amplifyconfiguration.json'

// // Amplify.configure(amplifyconfig)

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
