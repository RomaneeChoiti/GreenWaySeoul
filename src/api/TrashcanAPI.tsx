import axios from 'axios'
import { UserLocation } from '../components/Type'

const API_BASE_URL: string | undefined = process.env.API_BASE_URL

const fetchFilteredTrashCans = async ({
  location,
}: {
  location: UserLocation
}) => {

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
    return []  
  }
}

export default fetchFilteredTrashCans
