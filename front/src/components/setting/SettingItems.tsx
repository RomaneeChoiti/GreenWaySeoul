import React, {ReactNode} from 'react';
import {StyleSheet, Text, Pressable, PressableProps, View} from 'react-native';

import { useThemeStore } from '@/store/useThemeStore';
import { colors } from '@/constants';
import { ThemeMode } from '@/types';

interface SettingItemProps extends PressableProps {
  title: string;
  subTitle?: string;
  icon?: ReactNode;
  color?: string;
}

function SettingItem({
  title,
  subTitle,
  icon = null,
  color,
  ...props
}: SettingItemProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);


  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        pressed && styles.pressedContainer,
      ]}
      {...props}>
      {icon}
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, {color: color ?? colors[theme].BLACK}]}>
          {title}
        </Text>
        {subTitle && <Text style={styles.subTitleText}>{subTitle}</Text>}
      </View>
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 15,
    backgroundColor: colors[theme].WHITE,
    borderColor: colors[theme].GRAY_700,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pressedContainer: {
    backgroundColor: colors[theme].GRAY_300,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors[theme].BLACK,
  },
  subTitleText: {
    color: colors[theme].GRAY_500,
  },
});

export default SettingItem;