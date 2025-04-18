import { create } from 'zustand';

interface PloggingState {
  isPlogging: boolean;
  startTime: number | null;
  endTime: number | null;
  ploggingTime: number | null;
  startPlogging: () => void;
  stopPlogging: () => void;
}

const usePloggingStateStore = create<PloggingState>((set) => ({
    isPlogging: false,
    startTime: null,
    endTime: null,
    ploggingTime: null,
    startPlogging: () => set(() => ({
        isPlogging: true,
        startTime: Date.now(),
        endTime: null,
        ploggingTime: null,
    })),
    stopPlogging: () => set((state) => {
        const endTime = Date.now();
        const ploggingTime = state.startTime ? endTime - state.startTime : null;
        return {
            isPlogging: false,
            endTime,
            ploggingTime,
        };
    }),
}));

const usePloggingSuccessStore = create(() => ({
}));

export { usePloggingStateStore, usePloggingSuccessStore };