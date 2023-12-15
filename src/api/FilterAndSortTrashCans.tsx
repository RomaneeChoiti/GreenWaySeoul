import { UserLocation, TrashCanData } from '../components/Type'

const degToRad = (degrees: number) => degrees * (Math.PI / 180)

const filterAndSortTrashCans = (
  trashCans: TrashCanData[],
  { location }: { location: UserLocation },
): TrashCanData[] => {
  const earthRadius = 6371000
  const filterTrashCan = trashCans.reduce((filteredTrashCans, trashCan) => {
    const latDiffRad = degToRad(location.latitude - trashCan.Latitude)
    const lngDiffRad = degToRad(location.longitude - trashCan.Longitude)
    const distance = earthRadius * Math.sqrt(latDiffRad ** 2 + lngDiffRad ** 2)

    if (distance <= 1000) {
      filteredTrashCans.push({ ...trashCan, distance })
    }
    return filteredTrashCans
  }, [] as TrashCanData[])

  filterTrashCan.sort((a, b) => a.distance - b.distance)

  return filterTrashCan
}
export default filterAndSortTrashCans
