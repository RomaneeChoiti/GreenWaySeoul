import MapView, { Marker } from 'react-native-maps'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import useUserLocation from '../User/Location'
import fetchFilteredTrashCans from '../../api/TrashcanAPI'
import { UserLocation, TrashCanData, GyroscopeData } from '../Type'
import TypeDivide from '../Trashcan/TypeDivide'
import { DeviceMotion } from 'expo-sensors'
import { handleUserMarkerRotation } from '../User/Direction'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Map() {
  const { location, fetchLocation, userLocation } = useUserLocation()
  const [trashCanData, setTrashCanData] = useState<TrashCanData[]>([])
  const [shadowColor, setShadowColor] = useState('#B989FF')

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
      setShadowColor(data && data.length > 0 ? '#379FDA' : '#B989FF')
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

  return (
    <MapView style={styles.map}>
      <SafeAreaView>
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
        <View style={[styles.container, { shadowColor }]}>
          <View style={styles.searchInputContent}>
            <Image
              source={require('../../../assets/magnifier.png')}
              style={styles.searchIcon}
            />
            <Text style={styles.text}>Searching...</Text>
          </View>
        </View>
      </SafeAreaView>
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  container: {
    height: Dimensions.get('window').height * 0.05,
    flex: 1,

    // Position
    alignSelf: 'center',
    position: 'absolute', // 컨테이너가 지도 위에 오도록 설정
    marginTop: Dimensions.get('window').height * 0.05,
    width: '50%', // 80%
    maxWidth: '90%',

    backgroundColor: '#fff',
    borderRadius: 30,

    // Shadow (iOS)
    shadowColor: '#B989FF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 4,
    shadowRadius: 10,
    elevation: 2,
  },
  searchInputContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // 추가
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
  text: {
    fontSize: Dimensions.get('window').width * 0.04,
    color: '#232323',
    marginLeft: 10,
    marginRight: 20,
  },
})
