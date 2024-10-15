import axios from 'axios'
import { UserLocation } from '../components/Type'

const API_BASE_URL: string | undefined = process.env.API_BASE_URL

const fetchFilteredTrashCans = async ({
  location,
}: {
  location: UserLocation
}) => {

    // API URL이 설정되지 않았을 경우를 대비한 예외 처리
    if (!API_BASE_URL) {
      return [];
    }

    
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    })
    return response.data
  } catch (error) {
    return [] // 에러 발생 시 빈 배열 반환
  }
}

export default fetchFilteredTrashCans
