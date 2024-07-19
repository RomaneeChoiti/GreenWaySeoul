import MapView from 'react-native-maps'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import useUserLocation from '../User/Location'
// import fetchFilteredTrashCans from '../../api/TrashcanAPI'
import { TrashCanData, GyroscopeData } from '../Type'
import { DeviceMotion } from 'expo-sensors'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchModal from './Modal'
import UserMarker from '../User/UserMarker'
import TrashcanMarker from '../Trashcan/TrashcanMarker'
import fetchFilteredTrashCans from '../../api/TrashcanAPI'

export default function Map() {
  const { location, fetchLocation, userLocation } = useUserLocation()
  const [trashCanData, setTrashCanData] = useState<TrashCanData[]>([])
  const mapRef = useRef<MapView>(null)
  const [isModalVisible, setIsModalVisible] = useState(true)
  const [modalMessage, setModalMessage] = useState('Searching...')

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

        if (data && data.length > 0) {
          setTimeout(() => {
            setIsModalVisible(false)

            if (mapRef.current && location) {
              mapRef.current.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              })
            }
          }, 1500)
        } else {
          setTimeout(() => {
            setModalMessage('No nearby trash cans found.')
          }, 1500)
        }
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

  /* 
  * MapController component 기능 활성화 사유
  * User 위치를 화면에 확대 시키는 기능 에러.
  *
  useEffect(() => {
    const subscription = DeviceMotion.addListener(({ rotation }) => {
      setGyroscopeData({ rotation })
    })
    return () => subscription.remove()
  }, [])

  * 해당 에러 부분.
  ****************************************************************
  useEffect(() => {
    if (trashCanData.length > 0) {
      setTimeout(() => {
        setIsModalVisible(false)

        if (mapRef.current && location) {
          mapRef.current.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          })
        }
      }, 1500)
    }
  }, [trashCanData, location])
  ****************************************************************
  */

  const handleModalRequestClose = () => {
    if (trashCanData.length > 0) {
      setIsModalVisible(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <SearchModal
        isVisible={isModalVisible}
        message={modalMessage}
        onRequestClose={handleModalRequestClose}
        trashCanData={trashCanData}
      />
      {/* <MapController onTrashCansLoaded={setTrashCanData} /> */}

      <MapView ref={mapRef} followsUserLocation={true} style={styles.map}>
        <UserMarker coordinate={userLocation} gyroscopeData={gyroscopeData} />

        {trashCanData.map((trashCan, index) => (
          <TrashcanMarker key={index} trashCan={trashCan} />
        ))}
        <StatusBar style="auto" />
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
})
