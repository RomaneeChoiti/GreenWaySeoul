export default function TypeDivide(canType: string | string[]) {
  return canType === '재활용'
    ? require('../../../assets/RecycleIcon.png')
    : require('../../../assets/TrashCanIcon.png')
}
