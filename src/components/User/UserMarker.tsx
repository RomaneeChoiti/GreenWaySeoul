import React from 'react'
import { Marker } from 'react-native-maps'
import { GyroscopeData } from '../Type'
import { handleUserMarkerRotation } from '../User/Direction'

interface UserMarkerProps {
  coordinate: { latitude: number; longitude: number }
  gyroscopeData: GyroscopeData
}

const UserMarker: React.FC<UserMarkerProps> = ({
  coordinate,
  gyroscopeData,
}) => (
  <Marker
    coordinate={coordinate}
    image={require('../../../assets/userDirectionMarker.png')}
    style={handleUserMarkerRotation(gyroscopeData)}
  />
)

export default UserMarker
