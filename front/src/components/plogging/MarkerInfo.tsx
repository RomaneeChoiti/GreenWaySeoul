import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode, TrashcanData } from '@/types';

interface MarkerInfoProps {
  selectedMarker: TrashcanData | null;
  markerType?: 'recycle' | 'trash';
}

function MarkerInfo({ selectedMarker, markerType }: MarkerInfoProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  const getMarkerImage = () => {
    return markerType === 'recycle'
      ? require('@/assets/recycleIcon.png')
      : require('@/assets/trashcanIcon.png');
  };

  return (
    <View style={styles.contentRow}>
      <View style={styles.imageContainer}>
        {getMarkerImage() ? (
          <View style={styles.imageContent}>
            <Image source={getMarkerImage()} style={styles.markerImage} resizeMode="contain" />
          </View>
        ) : (
          <Text style={styles.details}>No image available</Text>
        )}
      </View>
      <View>
        {selectedMarker ? (
          <>
            <Text style={styles.locationInfo}>
              {selectedMarker.Address.length > 16
                ? selectedMarker.Address.slice(0, 16) + '...'
                : selectedMarker.Address}
            </Text>
            <Text style={styles.locationInfo}>{selectedMarker.설치위치}</Text>
          </>
        ) : (
          <Text style={styles.details}>No marker selected</Text>
        )}
      </View>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Dimensions.get('screen').width * 0.01,
    },
    imageContent: {
      width: Dimensions.get('screen').width * 0.17,
      height: Dimensions.get('screen').width * 0.17,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors[theme].GRAY_300,
      borderWidth: 1,
    },
    markerImage: {
      height: Dimensions.get('screen').width * 0.1,
    },
    locationInfo: {
      fontSize: 15,
      fontWeight: '600',
      color: colors[theme].BLACK,
    },
    details: {
      fontSize: 16,
      color: colors[theme].GRAY_700,
    },
  });

export default MarkerInfo;