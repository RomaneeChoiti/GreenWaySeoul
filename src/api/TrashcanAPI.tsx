import axios from 'axios'
import { TrashCanData, UserLocation } from '../components/Type'

const trashCanAPI: string | undefined = process.env.TRASHCAN_AWS_API_URL

const fetchFilteredTrashCans = async ({
  location,
}: {
  location: UserLocation
}): Promise<TrashCanData[]> => {
  try {
    const response = await axios.get(
      `${trashCanAPI}`,
      { params: { location } }, // 위치 데이터를 쿼리 매개변수로 전달
    )

    // 서버에서 필터링 및 정렬된 데이터를 직접 받아옴
    return response.data
  } catch (error) {
    console.error('Error fetching or filtering trash can data:', error)
    return [] // 에러 발생 시 빈 배열 반환
  }
}

export default fetchFilteredTrashCans
