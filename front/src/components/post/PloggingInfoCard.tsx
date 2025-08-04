import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import { ThemeMode } from '@/types';

interface PloggingInfoCardProps {
  date: string;
  day: string;
  time: string;
  address: string;
  place: string;
  theme: ThemeMode;
}

function PloggingInfoCard({
  date,
  day,
  time,
  address,
  place,
  theme,
}: PloggingInfoCardProps) {
  const styles = styling(theme);

  return (
    <View style={[styles.infoContainer, styles.flexRow]}>
      <View>
        <Text style={styles.title}>Date</Text>
        <Text style={styles.subTitle}>{date} ( {day} )</Text>
        <Text style={styles.title}>Plogging Time</Text>
        <Text style={styles.subTitle}>{time}</Text>
        <View style={styles.flexRow}>
          <Ionicons name="location-outline" size={20} color={colors[theme].UNCHANGE_GRAY_500}/>
          <View>
            <Text style={styles.locationText}>{address}</Text>
            <Text style={styles.locationText}>{place}</Text>
          </View>
        </View>
      </View>
      <View style={styles.backgroundLogo}>
        <Ionicons name="trash-sharp" size={130} color={'#86a907'}/>
      </View>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    flexRow: {
      flexDirection: 'row',
    },
    infoContainer: {
      backgroundColor: colors.PRIMARY,
      paddingVertical: Dimensions.get('screen').height * 0.04,
      paddingHorizontal: Dimensions.get('screen').width * 0.07,
      borderRadius: 20,
    },
    backgroundLogo: {
      position: 'absolute',
      right: Dimensions.get('screen').width * 0.01,
      bottom: Dimensions.get('screen').height * 0.03,
    },
    title: {
      fontSize: 10,
      color: colors[theme].UNCHANGE_GRAY_500,
      fontWeight: 'bold',
      marginBottom: Dimensions.get('screen').height * 0.005,
    },
    subTitle: {
      fontSize: 12,
      fontWeight: '600',
      marginBottom: Dimensions.get('screen').height * 0.015,
    },
    locationText: {
      fontSize: 11,
      color: colors[theme].UNCHANGE_GRAY_500,
      fontWeight: '900',
    },
  });

export default PloggingInfoCard;
