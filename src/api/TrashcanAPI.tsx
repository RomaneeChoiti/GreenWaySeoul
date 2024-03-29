import axios from 'axios'
import { UserLocation } from '../components/Type'
import filterAndSortTrashCans from './FilterAndSortTrashCans'

const trashCanAPI: string | undefined = process.env.TRASHCAN_API_URL

const filteredTrashCanData = ({ location }: { location: UserLocation }) => {
  return axios
    .get(`${trashCanAPI}/trashCan`)
    .then((trashCanData) => {
      return filterAndSortTrashCans(trashCanData.data, { location })
    })
    .then((filterTrashCanData) => {
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
