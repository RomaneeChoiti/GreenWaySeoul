import MapView, { Marker } from 'react-native-maps'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import useUserLocation from '../User/Location'
import fetchFilteredTrashCans from '../../api/TrashcanAPI'
import { TrashCanData, GyroscopeData } from '../Type'
import TypeDivide from '../Trashcan/TypeDivide'
import { DeviceMotion } from 'expo-sensors'
import { handleUserMarkerRotation } from '../User/Direction'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Map() {
  const { location, fetchLocation, userLocation } = useUserLocation()
  const [trashCanData, setTrashCanData] = useState<TrashCanData[]>([])
  const mapRef = useRef<MapView>(null)

  const [gyroscopeData, setGyroscopeData] = useState<GyroscopeData>({
    rotation: {
      alpha: 0,
      beta: 0,
      gamma: 0,
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchLocation()
        const data = await fetchFilteredTrashCans({ location })
        setTrashCanData(data ?? [])
      } catch (error) {
        console.error('Error fetching trash can data:', error)
      }
    }
    fetchData()

    const subscription = DeviceMotion.addListener(({ rotation }) => {
      setGyroscopeData({ rotation })
    })
    return () => subscription.remove()
  }, [location])

  const animatedStyle = {
    shadowColor: trashCanData.length > 0 ? '#379FDA' : '#B989FF',
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <MapView ref={mapRef} followsUserLocation={true} style={styles.map}>
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
        <View style={[styles.container, animatedStyle]}>
          <View style={styles.searchInputContent}>
            <Image
              style={styles.searchIcon}
              source={require('../../../assets/magnifier.png')}
            />
            <Text style={styles.text}>
              {trashCanData.length > 0
                ? 'Nearby trash can search complete.'
                : 'Searching...'}
            </Text>
          </View>
        </View>
      </MapView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  container: {
    // position
    position: 'absolute', // 컨테이너를 지도 위에 배치
    alignSelf: 'center',
    top: Dimensions.get('window').height * 0.05,

    // style
    backgroundColor: '#fff',
    borderRadius: 30,

    // Shadow
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 4,
    shadowRadius: 10,
    elevation: 2,
  },

  searchInputContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  searchIcon: {
    width: 30,
    height: 30,
    marginRight: 8, // 아이콘과 텍스트 사이 간격 추가
    lexWrap: 'wrap',
  },
  text: {
    fontSize: Dimensions.get('window').width * 0.04,
    color: '#232323',
  },
})
