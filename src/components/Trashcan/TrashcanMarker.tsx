import React from 'react'
import { Marker } from 'react-native-maps'
import { TrashCanData } from '../Type'
import TypeDivide from '../Trashcan/TypeDivide'

interface TrashcanMarkerProps {
  trashCan: TrashCanData
}

const TrashcanMarker: React.FC<TrashcanMarkerProps> = ({ trashCan }) => (
  <Marker
    coordinate={{ latitude: trashCan.Latitude, longitude: trashCan.Longitude }}
    image={TypeDivide(trashCan.canType)}
  />
)

export default TrashcanMarker
