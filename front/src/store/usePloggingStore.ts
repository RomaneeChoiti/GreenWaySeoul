import { create } from 'zustand';

interface PloggingState {
  isPlogging: boolean;
  startPlogging: () => void;
}
/*
    TODO: isPlogging이 true일 때,
    1. 디자인 추가 : Map화면에 플로깅 중 이팩트
    2. 기능 추가
        2-1. 선택된 trashCan 외에 다른 trashCan은 투명도 50%
        2-2. 플로깅 중일 때는 다른 trashCan 선택 불가능
        2-3. 플로깅 중단 버튼 추가
*/

const usePloggingStateStore = create<PloggingState>((set) => ({
  isPlogging: false,
  startPlogging: () => set({ isPlogging: true }),
}));

/*
    TODO: 플로깅 중일때만 가능
        1. 디자인 추가
            1-1, 플로깅 성공 이팩트
            1-2, 플로깅 중단 이팩트
        2. 기능 추가
            2-1. 플로깅 성공 시, 플로깅 성공 슬라이드 모달
            2-2. 플로깅 중단 시, 플로깅 중단 슬라이드 모달
                2-2-1. 플로깅 중단 슬라이드 모달, 최종 중단 버튼

*/
const usePloggingSuccessStore = create(() => ({
}));

export { usePloggingStateStore, usePloggingSuccessStore };