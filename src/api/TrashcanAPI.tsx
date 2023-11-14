import axios from 'axios'
import useUserLocation from '../components/User/Location'

const trashCanAPI = process.env.TRASHCAN_API_URL

const ScopeTrashCanData = async () => {
  const trashcanData = await axios.get(`${trashCanAPI}/trashCan`)
  const { location } = await useUserLocation()

  const degToRad = (degrees: number) => degrees * (Math.PI / 180)

  const earthRadius = 6371000
  const ScopeTrashcan = trashcanData.data.reduce(
    (filteredTrashCans, trashCan) => {
      const latDiffRad = degToRad(location.latitude - trashCan.Latitude)
      const lngDiffRad = degToRad(location.longitude - trashCan.Longitude)
      const distance =
        earthRadius * Math.sqrt(latDiffRad ** 2 + lngDiffRad ** 2)

      if (distance <= 1000) {
        filteredTrashCans.push({ ...trashCan, distance })
      }
      return filteredTrashCans
    },
    [],
  )

  ScopeTrashcan.sort((a, b) => a.distance - b.distance)

  return ScopeTrashcan
}

export default ScopeTrashCanData
