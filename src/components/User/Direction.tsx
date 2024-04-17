import { GyroscopeData } from '../Type'

export const handleUserMarkerRotation = (gyroscopeData: GyroscopeData) => {
  const alpha = gyroscopeData.rotation.alpha // Get the alpha rotation value

  // Calculate a rotation degree based on alpha (adjust as needed)
  const rotationDegrees = alpha * (180 / Math.PI) // Convert radians to degrees

  return {
    transform: [{ rotateZ: `${rotationDegrees}deg` }], // Set the rotation transform
  }
}
