// src/data/natureImageData.ts
import { ImageSourcePropType } from 'react-native';
import environmentalDays from './environmental_days.json';

export type NatureImage = {
  image: ImageSourcePropType;
  label: string;
  date: string;
};

const natureImgFiles: ImageSourcePropType[] = [
  require('../assets/natureImgs/1.png'),
  require('../assets/natureImgs/2.png'),
  require('../assets/natureImgs/3.png'),
  require('../assets/natureImgs/4.png'),
  require('../assets/natureImgs/5.png'),
  require('../assets/natureImgs/6.png'),
  require('../assets/natureImgs/7.png'),
];

const natureImages: NatureImage[] = natureImgFiles.map((img, index) => ({
  image: img,
  label: environmentalDays[index]?.name ?? '',
  date: environmentalDays[index]?.date ?? '',
}));

export default natureImages;
