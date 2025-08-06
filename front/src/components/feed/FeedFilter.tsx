import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FilterType } from '@/types/filter';
import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface FeedFilterProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

function FeedFilter({ selectedFilter, onFilterChange }: FeedFilterProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  const filters: FilterType[] = ['최신순', '점수순', '하이라이트'];

  return (
    <View style={styles.container}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterButton,
            selectedFilter === filter && styles.selectedButton,
          ]}
          onPress={() => onFilterChange(filter)}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === filter && styles.selectedText,
            ]}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: Dimensions.get('window').height * 0.025,
      marginBottom: Dimensions.get('window').height * 0.01,
      backgroundColor: colors[theme].GRAY_300,
      borderRadius: 20,
    },
    filterButton: {
      paddingHorizontal: Dimensions.get('window').width * 0.11,
      paddingVertical: Dimensions.get('window').height * 0.015,
      borderRadius: 20,
    },
    selectedButton: {
      backgroundColor: colors[theme].GRAY_700,
    },
    filterText: {
      fontSize: 10,
      fontWeight: '900',
      color: colors[theme].GRAY_700,
    },
    selectedText: {
        fontSize: 10,
        fontWeight: '900',
        color: colors[theme].WHITE,
    },
  });

export default FeedFilter;
