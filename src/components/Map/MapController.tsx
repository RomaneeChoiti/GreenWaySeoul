import React, { useEffect, useState } from 'react'
import useUserLocation from '../User/Location'
import fetchFilteredTrashCans from '../../api/TrashcanAPI'
import { TrashCanData } from '../Type'

interface MapControllerProps {
  onTrashCansLoaded: (trashCans: TrashCanData[]) => void
}

export const MapController: React.FC<MapControllerProps> = ({
  onTrashCansLoaded,
}) => {
  const { location, fetchLocation } = useUserLocation()
  const [trashCanData, setTrashCanData] = useState<TrashCanData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchLocation()
        const data = await fetchFilteredTrashCans({ location })
        setTrashCanData(data ?? [])
        onTrashCansLoaded(data ?? [])
      } catch (error) {
        console.error('Error fetching trash can data:', error)
      }
    }

    fetchData()
  }, [location, onTrashCansLoaded])

  return null // 이 컴포넌트는 직접적인 UI를 렌더링하지 않습니다.
}
