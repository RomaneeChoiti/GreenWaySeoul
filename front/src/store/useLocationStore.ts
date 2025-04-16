import { LatLng } from 'react-native-maps';
import { create } from 'zustand';

interface LocationState {
    userLocation: LatLng;
    setUserLocation: (userLocation: LatLng) => void;
}

const useLocationStore = create<LocationState>(set => ({
    userLocation: { latitude: 37.5779, longitude: 126.9769 }, // 초기값 설정
    setUserLocation: (userLocation: LatLng) =>
        set({ userLocation }),
}));

export { useLocationStore };