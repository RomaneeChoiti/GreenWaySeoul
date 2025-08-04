import { useMemo } from 'react';

interface PloggingCalculation {
  ploggingMinutes: number;
  co2Reduction: string;
  treeEquivalent: number;
}

function usePloggingCalculator(ploggingTime: number | null): PloggingCalculation {
  return useMemo(() => {
    // 플로깅 시간을 분 단위로 계산
    const calculatePloggingMinutes = () => {
      if (!ploggingTime) {
        return 0;
      }
      const timeInMs = ploggingTime;
      return Math.floor(timeInMs / (1000 * 60)); // 밀리초를 분으로 변환
    };

    const ploggingMinutes = calculatePloggingMinutes();
    const co2Reduction = (ploggingMinutes * 0.03).toFixed(2); // 분당 0.03kg CO2 절감

    // 나무 1그루가 연간 흡수하는 CO2량: 약 20-25kg (하루로 환산하면 약 0.055-0.068kg)
    // 여기서는 하루 평균 0.06kg로 계산
    const co2PerTreePerDay = 0.03; // kg
    const treeEquivalent = Math.floor(parseFloat(co2Reduction) / co2PerTreePerDay);

    return {
      ploggingMinutes,
      co2Reduction,
      treeEquivalent,
    };
  }, [ploggingTime]);
}

export default usePloggingCalculator;
