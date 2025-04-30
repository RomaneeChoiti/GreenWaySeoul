import { useFeedLocationStore } from "@/store/useLocationStore";
import { useEffect, useRef } from "react";
import MapView, { LatLng } from "react-native-maps";

function useMoveMapView(){
    const mapRef = useRef<MapView | null>(null);

    const {feedLocation} = useFeedLocationStore();

      const moveMapView = (coordinate: LatLng) => {
        mapRef.current?.animateToRegion({
          ...coordinate,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      };


      useEffect(() => {
        feedLocation && moveMapView(feedLocation);
      },[feedLocation]);

      return {mapRef, moveMapView};
}

export default useMoveMapView;