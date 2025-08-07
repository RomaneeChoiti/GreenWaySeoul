import { colors } from '@/constants';
import { View, ImageBackground, Text, StyleSheet, ImageSourcePropType, Dimensions } from 'react-native';

type Props = {
  source: ImageSourcePropType;
  text?: string;
  date?: string;
  width?: number;
  height?: number;
  address?: string;
  time?: number;
};

export default function ImageWithBoxOverlay({ source, date, width, height, address, time }: Props) {
  return (
    <ImageBackground
      source={source}
      style={[styles.container, { width, height }]}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlayContainer}>
        <View style={[styles.dateOverlay, styles.spaceEvenly]}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Location</Text>
                    <Text style={[styles.text, styles.addressText]}>{address}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Date</Text>
                    <Text style={styles.text}>{date}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Time</Text>
                    <Text style={styles.text}>{time}분</Text>
                </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  backgroundImage: {
    borderRadius: 14,
    resizeMode: 'cover',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Dimensions.get('screen').width * 0.023,
  },
  dateOverlay: {
    backgroundColor: colors.PRIMARY,
    padding: Dimensions.get('screen').width * 0.02,
    borderRadius: 12,
    flexDirection: 'row',
    gap: Dimensions.get('screen').width * 0.02,
  },
  spaceEvenly:{
    justifyContent: 'space-evenly',
    width: '100%',
  },
  textContainer:{
    flexDirection: 'column',
  },
  title: {
        fontSize: 11,
        fontWeight: '800',
        color: '#848484',
    },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
  addressText: {
    maxWidth: 80, // 약 10글자 정도
    flexWrap: 'wrap',
  },
});
