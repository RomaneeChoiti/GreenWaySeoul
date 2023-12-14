import axios from 'axios'
import filterAndSortTrashCans from './FilterAndSortTrashCans'

interface Location {
  latitude: number
  longitude: number
}

const trashCanAPI: string | undefined = process.env.TRASHCAN_API_URL

const filteredTrashCanData = async ({ location }: { location: Location }) => {
  try {
    const trashCanData = await axios.get(`${trashCanAPI}/trashCan`)
    const filterTrashCanData = filterAndSortTrashCans(
      trashCanData.data,
      location,
    )
    return filterTrashCanData
  } catch (error) {
    console.error(
      '쓰레기통 데이터를 가져오거나 필터링하는 동안 에러 발생:',
      error,
    )
  }
}

export default filteredTrashCanData
