import React from 'react'
import { StatusBar } from 'expo-status-bar'
// import { useEffect } from "react";
import { StyleSheet, View } from 'react-native'
// import * as Location from "expo-location";

export default function App() {
  return (
    <View style={styles.continer}>
      <StatusBar style="auto" />
    </View>
  )
}
const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: 'white',
  },
})
