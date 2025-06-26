import { create } from 'zustand';

export interface TrashcanState {
  location: string | null;
  address: string | null;
  canType: string | null;
  latitude: number | null;
  longitude: number | null;
  setTrashcanInfo: (
    location: string,
    address: string,
    canType: string,
    latitude: number,
    longitude: number
  ) => void;
  clearTrashcanInfo: () => void;
}

const useTrashcanStore = create<TrashcanState>((set) => ({
  location: null,
  address: null,
  canType: null,
  latitude: null,
  longitude: null,
  setTrashcanInfo: (location, address, canType, latitude, longitude) =>
  set({ location, address, canType, latitude, longitude }),
  clearTrashcanInfo: () =>
  set({ location: null, address: null, canType: null, latitude: null, longitude: null}),
}));

export { useTrashcanStore };
