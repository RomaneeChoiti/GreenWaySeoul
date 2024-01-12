import { UserLocation, TrashCanData } from '../components/Type'

const degToRad = (degrees: number) => degrees * (Math.PI / 180)
const MAX_DISTANCE_THRESHOLD = 1000

const filterAndSortTrashCans = (
  trashCanData: TrashCanData[],
  { location }: { location: UserLocation },
): TrashCanData[] => {
  const dataArray = Array.isArray(trashCanData)
    ? trashCanData
    : [trashCanData].filter(Boolean)
  console.log(trashCanData[1])

  if (!Array.isArray(dataArray)) {
    throw new Error('배열이 아닌 쓰레기통 데이터가 전달되었습니다.')
  } else if (!dataArray) {
    throw new Error('데이터가 존재하지 앉습니다.')
  }

  const earthRadius = 6371000
  const filterTrashCan = dataArray.reduce((filteredTrashCans, trashCan) => {
    const latDiffRad = degToRad(location.latitude - trashCan.Latitude)
    const lngDiffRad = degToRad(location.longitude - trashCan.Longitude)
    const distance = earthRadius * Math.sqrt(latDiffRad ** 2 + lngDiffRad ** 2)

    if (distance <= MAX_DISTANCE_THRESHOLD) {
      filteredTrashCans.push({ ...trashCan, distance })
    }

    return filteredTrashCans
  }, [] as TrashCanData[])

  filterTrashCan.sort((a, b) => a.distance - b.distance)

  return filterTrashCan
}

export default filterAndSortTrashCans
