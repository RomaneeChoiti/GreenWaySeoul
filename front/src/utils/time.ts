/**
 * 시간을 HH:MM:SS 형식으로 포맷팅합니다.
 * @param timeValue - 초 단위 시간 또는 밀리초 단위 시간
 * @param isMilliseconds - true면 밀리초 단위로 처리, false면 초 단위로 처리 (기본값: false)
 * @returns HH:MM:SS 형식의 시간 문자열
 */
export const formatTime = (timeValue: number | null, isMilliseconds: boolean = false): string => {
  if (!timeValue) {
    return '00:00:00';
  }

  const totalSeconds = isMilliseconds ? Math.floor(timeValue / 1000) : timeValue;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
