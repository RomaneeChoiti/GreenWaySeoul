import { create } from 'zustand';

interface PloggingState {
  isPlogging: boolean;
  startPlogging: () => void;
  stopPlogging: () => void;
}

const usePloggingStateStore = create<PloggingState>((set) => ({
    isPlogging: false,
    startPlogging: () => set({ isPlogging: true }),
    stopPlogging: () => set({ isPlogging: false }),
}));

const usePloggingSuccessStore = create(() => ({
}));

export { usePloggingStateStore, usePloggingSuccessStore };