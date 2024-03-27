import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import useUserLocation from '../User/Location'
import Loading from '../../Loading'
import filteredTrashCanData from '../../api/TrashcanAPI'
import { UserLocation, TrashCanData } from '../Type'
import TypeDivide from '../Trashcan/TypeDivide'
import { DeviceMotion } from 'expo-sensors'

interface GyroscopeData {
  rotation: {
    alpha: number
    beta: number
    gamma: number
  }
}

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
      // console.log(rotation.beta)
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
      const data = await filteredTrashCanData({ location })
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

  const handleUserMarkerRotation = () => {
    const alpha = gyroscopeData.rotation.alpha // Get the alpha rotation value

    // Calculate a rotation degree based on alpha (adjust as needed)
    const rotationDegrees = alpha * (180 / Math.PI) // Convert radians to degrees

    return {
      transform: [{ rotateZ: `${rotationDegrees}deg` }], // Set the rotation transform
    }
  }

  return (
    <MapView style={styles.map}>
      <Marker
        coordinate={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }}
        image={require('../../../assets/userDirectionMarker.png')}
        style={handleUserMarkerRotation()}
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
      <Text>alpha: {gyroscopeData.rotation.alpha}</Text>
      {/* <Text>beta: {gyroscopeData.rotation.beta}</Text> */}
      {/* <Text>gamma: {gyroscopeData.rotation.gamma}</Text> */}
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
