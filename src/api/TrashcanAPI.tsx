import axios from 'axios'

interface Location {
  latitude: number
  longitude: number
}

interface TrashCanData {
  Address: string
  Latitude: number
  Longitude: number
  canType: string
  설치위치: string
  distance: number
}

const trashCanAPI: string | undefined = process.env.TRASHCAN_API_URL

const earthRadius = 6371000

const degToRad = (degrees: number) => degrees * (Math.PI / 180)

const ScopeTrashCanData = async ({ location }: { location: Location }) => {
  const trashcanData = await axios.get(`${trashCanAPI}/trashCan`)

  const ScopeTrashcan = trashcanData.data.reduce(
    (filteredTrashCans: TrashCanData[], trashCan: TrashCanData) => {
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

  ScopeTrashcan.sort(
    (a: TrashCanData, b: TrashCanData) => a.distance - b.distance,
  )

  return ScopeTrashcan
}

export default ScopeTrashCanData
