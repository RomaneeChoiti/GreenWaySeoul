import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
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
  
  // 슬라이딩 애니메이션을 위한 translateX 값
  const slideAnimation = useRef(new Animated.Value(0)).current;
  
  // 현재 선택된 필터의 인덱스
  const selectedIndex = filters.indexOf(selectedFilter);
  
  // 버튼 너비 계산 (컨테이너 너비를 3등분)
  const buttonWidth = Dimensions.get('window').width * 0.9 / 3;

  // 선택된 필터가 변경될 때 슬라이딩 애니메이션 실행
  useEffect(() => {
    const targetPosition = selectedIndex * buttonWidth;
    
    Animated.timing(slideAnimation, {
      toValue: targetPosition,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [selectedFilter, selectedIndex, buttonWidth, slideAnimation]);

  return (
    <View style={styles.container}>
      {/* 슬라이딩 인디케이터 */}
      <Animated.View
        style={[
          styles.indicator,
          {
            width: buttonWidth,
            transform: [{ translateX: slideAnimation }],
          },
        ]}
      />
      
      {/* 필터 버튼들 */}
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[styles.filterButton, { width: buttonWidth }]}
          onPress={() => onFilterChange(filter)}
        >
          <Animated.Text
            style={[
              styles.filterText,
              selectedFilter === filter && styles.selectedText,
            ]}
          >
            {filter}
          </Animated.Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      position: 'relative',
      marginTop: Dimensions.get('window').height * 0.025,
      marginBottom: Dimensions.get('window').height * 0.01,
      backgroundColor: colors[theme].GRAY_300,
      borderRadius: 20,
      width: Dimensions.get('window').width * 0.9,
      alignSelf: 'center',
    },
    indicator: {
      position: 'absolute',
      height: '100%',
      backgroundColor: colors[theme].GRAY_700,
      borderRadius: 20,
      top: 0,
      left: 0,
      zIndex: 1,
    },
    filterButton: {
      paddingVertical: Dimensions.get('window').height * 0.015,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
    },
    filterText: {
      fontSize: 10,
      fontWeight: '900',
      color: colors[theme].GRAY_700,
    },
    selectedText: {
      color: colors[theme].WHITE,
    },
  });

export default FeedFilter;
