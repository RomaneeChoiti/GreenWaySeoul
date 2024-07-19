import React from 'react'
import { Callout, Marker } from 'react-native-maps'
import { TrashCanData } from '../Type'
import TypeDivide from '../Trashcan/TypeDivide'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface TrashcanMarkerProps {
  trashCan: TrashCanData
  isSelected: boolean // 마커가 선택되었는지 여부
  onPress: () => void
}

const TrashcanMarker: React.FC<TrashcanMarkerProps> = ({
  trashCan,
  isSelected,
  onPress,
}) => (
  <Marker
    coordinate={{
      latitude: trashCan.Latitude,
      longitude: trashCan.Longitude,
    }}
    image={TypeDivide(trashCan.canType)}
    onPress={onPress}
  >
    {isSelected && ( // isSelected가 true일 때만 Callout 표시
      <Callout style={styles.calloutContainer}>
        <View>
          <Text style={styles.calloutTitle}>Trash Can Details</Text>
          <Text>Address: {trashCan.Address}</Text>
          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.imageButton}>
              <Image
                source={require('../../../assets/Eng.png')}
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton}>
              <Image
                source={require('../../../assets/China.png')}
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton}>
              <Image
                source={require('../../../assets/Japan.png')}
                style={styles.buttonImage}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </Callout>
    )}
  </Marker>
)

const styles = StyleSheet.create({
  calloutContainer: {
    width: 200,
    padding: 10,
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  imageButton: {
    width: 15,
    height: 15,
  },
  buttonImage: {
    width: 40, // 이미지 크기 조절
    height: 40,
  },
})

export default TrashcanMarker
