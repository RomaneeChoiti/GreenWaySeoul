import axios from 'axios'
import { UserLocation } from '../components/Type'

const trashCanAPI: string | undefined = process.env.API_KEY

const fetchFilteredTrashCans = async ({
  location,
}: {
  location: UserLocation
}) => {
  try {
    const response = await axios.get(`${trashCanAPI}`, {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    })
    return response.data
  } catch (error) {
    console.error('쓰레기통 데이터를 가져오는 동안 에러 발생:', error)
    return [] // 에러 발생 시 빈 배열 반환
  }
}

export default fetchFilteredTrashCans
