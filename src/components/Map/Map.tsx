import MapView, { Marker } from 'react-native-maps'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
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
  const [isModalVisible, setIsModalVisible] = useState(true) // Modal starts visible
  const [modalMessage, setModalMessage] = useState('Searching...') // 초기 메시지

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
                latitudeDelta: 0.1, // 원하는 줌 레벨 조절
                longitudeDelta: 0.1,
              })
            }
          }, 1500) // 검색 성공 시 1초 후 닫기
        } else {
          setTimeout(() => {
            setModalMessage('No nearby trash cans found.')
          }, 15000) // 15초 후 메시지 변경
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

  const animatedStyle = {
    shadowColor: modalMessage === 'Searching...' ? '#B989FF' : '#379FDA',
  }

  const handleModalRequestClose = () => {
    if (trashCanData.length > 0) {
      setIsModalVisible(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={handleModalRequestClose}
      >
        <TouchableWithoutFeedback onPress={handleModalRequestClose}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={[styles.container, animatedStyle, styles.modalContent]}>
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
      </Modal>

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
    marginTop: Dimensions.get('window').height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',

    width: '80%',
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 30,

    // Shadow
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 4,
    shadowRadius: 10,
    elevation: 2,
  },

  searchIcon: {
    widtth: 30,
    heigh: 30,
    marginRight: 8, // 아이콘과 텍스트 사이 간격 추가
  },

  text: {
    fontSize: Dimensions.get('window').width * 0.04,
    color: '#232323',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    position: 'absolute',
    alignSelf: 'center', // Center horizontally
    marginBottom: Dimensions.get('window').height * 0.05, // Match original marginTop
  },
})
