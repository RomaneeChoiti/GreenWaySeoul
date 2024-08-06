import { GyroscopeData } from '../Type'

export const handleUserMarkerRotation = (gyroscopeData: GyroscopeData) => {
  const alpha = gyroscopeData.rotation.alpha
  const rotationDegrees = alpha * (180 / Math.PI)

  return {
    transform: [{ rotateZ: `${rotationDegrees}deg` }],
  }
}
