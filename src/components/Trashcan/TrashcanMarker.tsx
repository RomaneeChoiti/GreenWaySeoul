import React from 'react'
import { Callout, Marker } from 'react-native-maps'
import { TrashCanData } from '../Type'
import TypeDivide from '../Trashcan/TypeDivide'
import { StyleSheet, Text, View } from 'react-native'

interface TrashcanMarkerProps {
  trashCan: TrashCanData
  isSelected: boolean
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
    {isSelected && (
      <Callout style={styles.calloutContainer}>
        <View>
          <Text style={styles.calloutTitle}>Trash Can Details</Text>
          <Text>Address: {trashCan.Address}</Text>
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
    width: 40,
    height: 40,
  },
})

export default TrashcanMarker
