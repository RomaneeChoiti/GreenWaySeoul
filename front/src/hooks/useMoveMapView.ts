import { useFeedLocationStore } from '@/store/useLocationStore';
import { useCallback, useEffect, useRef } from 'react';
import MapView, { LatLng } from 'react-native-maps';

function useMoveMapView(){
    const mapRef = useRef<MapView | null>(null);

    const {feedLocation} = useFeedLocationStore();

    const moveMapView = useCallback((coordinate: LatLng) => {
        mapRef.current?.animateToRegion({
          ...coordinate,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
    }, []);


      useEffect(() => {
        feedLocation && moveMapView(feedLocation);
      },[feedLocation, moveMapView]);

      return {mapRef, moveMapView};
}

export default useMoveMapView;
