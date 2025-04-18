import { create } from 'zustand';

interface TrashcanState {
  location: string | null;
  address: string | null;
  canType: string | null;
  setTrashcanInfo: (location: string, address: string, canType: string) => void;
  clearTrashcanInfo: () => void;
}

const useTrashcanStore = create<TrashcanState>((set) => ({
  location: null,
  address: null,
  canType: null,
  setTrashcanInfo: (location, address, canType) =>
    set({ location, address, canType }),
  clearTrashcanInfo: () => set({ location: null, address: null, canType: null }),
}));

export { useTrashcanStore };