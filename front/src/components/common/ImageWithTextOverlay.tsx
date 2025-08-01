import { View, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';

type Props = {
  source: ImageSourcePropType;
  text?: string;
  date?: string;
  width?: number;
  height?: number;
};

export default function ImageWithTextOverlay({ source, text, date, width, height }: Props) {
  return (
    <View style={[styles.container, { width, height }]}>
      <Image source={source} style={styles.image} />
      <View style={styles.dateOverlay}>
        <Text style={styles.text}>{date}</Text>
      </View>
      <View style={styles.textOverlay}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 13,
    left: 12,
  },
  dateOverlay: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },
});
