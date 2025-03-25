import React from 'react'
import { Marker } from 'react-native-maps'
import { GyroscopeData } from '../Type'
import { handleUserMarkerRotation } from '../User/Direction'

type UserMarkerProps = {
  coordinate: { latitude: number; longitude: number }
  gyroscopeData: GyroscopeData
}

const UserMarker= ({
  coordinate,
  gyroscopeData,
}:UserMarkerProps) => (
  <Marker
    coordinate={coordinate}
    image={require('../../../assets/userDirectionMarker.png')}
    style={handleUserMarkerRotation(gyroscopeData)}
  />
)

export default UserMarker
