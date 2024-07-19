import MapView from 'react-native-maps'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import useUserLocation from '../User/Location'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchModal from './Modal'
import UserMarker from '../User/UserMarker'
import TrashcanMarker from '../Trashcan/TrashcanMarker'
import useTrashCanDataAndGyroscope from './MapController'

export default function Map() {
  const { location, fetchLocation, userLocation } = useUserLocation()
  const { trashCanData, gyroscopeData, isLoading, error } =
    useTrashCanDataAndGyroscope(location)
  const mapRef = useRef<MapView>(null)
  const [isModalVisible, setIsModalVisible] = useState(true)
  const [modalMessage, setModalMessage] = useState('Searching...')

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchLocation()
      } catch (error) {
        console.error('Error fetching user location:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (trashCanData && trashCanData.length > 0) {
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
          setModalMessage(error || 'No nearby trash cans found.')
        }, 1500)
      }
    }
  }, [isLoading, trashCanData, error, location])

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
