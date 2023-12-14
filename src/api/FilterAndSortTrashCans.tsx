interface TrashCanData {
  Address: string
  Latitude: number
  Longitude: number
  canType: string
  설치위치: string
  distance: number
}

interface Location {
  latitude: number
  longitude: number
}

const degToRad = (degrees: number) => degrees * (Math.PI / 180)
const earthRadius = 6371000

const filterAndSortTrashCans = (
  trashCans: TrashCanData[],
  location: Location,
): TrashCanData[] => {
  return [...trashCans]
    .filter((trashCan) => {
      const latDiffRad = degToRad(location.latitude - trashCan.Latitude)
      const lngDiffRad = degToRad(location.longitude - trashCan.Longitude)
      const distance =
        earthRadius * Math.sqrt(latDiffRad ** 2 + lngDiffRad ** 2)

      return distance <= 1000
    }, [])
    .sort((a, b) => a.distance - b.distance)
}
export default filterAndSortTrashCans
