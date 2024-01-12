export default function TypeDivide(canType: string | string[]) {
  return canType === '일반쓰레기'
    ? require('../../../assets/TrashCanIcon.png')
    : require('../../../assets/RecycleIcon.png')
}
