import { useEffect, useState } from 'react'
import { DeviceMotion } from 'expo-sensors'
import { TrashCanData, GyroscopeData, UserLocation } from '../Type'
import fetchFilteredTrashCans from '../../api/TrashcanAPI'

const useTrashCanDataAndGyroscope = (location: UserLocation | null) => {
  const [trashCanData, setTrashCanData] = useState<TrashCanData[]>([])
  const [gyroscopeData, setGyroscopeData] = useState<GyroscopeData>({
    rotation: { alpha: 0, beta: 0, gamma: 0 },
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!location) return

      try {
        const data = await fetchFilteredTrashCans({ location })
        setTrashCanData(data ?? [])
        setError(null)
      } catch (error) {
        console.error('Error fetching trash can data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [location])

  useEffect(() => {
    const subscription = DeviceMotion.addListener(({ rotation }) => {
      setGyroscopeData({ rotation })
    })
    return () => subscription.remove()
  }, [])

  return { trashCanData, gyroscopeData, isLoading, error }
}

export default useTrashCanDataAndGyroscope
