import axios, { AxiosError } from 'axios'
import { TrashCanData, UserLocation } from '../components/Type'
import filterAndSortTrashCans from './FilterAndSortTrashCans'

const trashCanAPI: string | undefined = process.env.TRASHCAN_API_URL

const filteredTrashCanData = ({ location }: { location: UserLocation }) => {
  return axios
    .get(`${trashCanAPI}/trashCan`)
    .then((trashCans): TrashCanData[] => {
      return filterAndSortTrashCans(trashCans.data, { location })
    })
    .then((filterTrashCanData) => {
      return filterTrashCanData
    })
    .catch((error: AxiosError | Error) => {
      if (axios.isAxiosError(error)) {
        console.error('네트워크 오류가 발생했습니다.', error.message)
      } else {
        console.error('다른 오류가 발생했습니다.', (error as Error).message)
      }
    })
}

export default filteredTrashCanData
