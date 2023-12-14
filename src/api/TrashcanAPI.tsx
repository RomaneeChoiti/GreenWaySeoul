import axios from 'axios'
import filterAndSortTrashCans from './FilterAndSortTrashCans'

interface Location {
  latitude: number
  longitude: number
}

const trashCanAPI: string | undefined = process.env.TRASHCAN_API_URL

const filteredTrashCanData = ({ location }: { location: Location }) => {
  return axios
    .get(`${trashCanAPI}/trashCan`)
    .then((trashCanData) => {
      console.log('쓰레기통 데이터 : ', trashCanData.data[1])
      return filterAndSortTrashCans(trashCanData.data, location)
    })
    .then((filterTrashCanData) => {
      console.log('필터된 데이터 : ', filterTrashCanData[1])
      return filterTrashCanData
    })
    .catch((error) => {
      console.error(
        '쓰레기통 데이터를 가져오거나 필터링하는 동안 에러 발생:',
        error,
      )
    })
}

export default filteredTrashCanData
