import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { ReactNode } from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface HeaderButtonProps extends PressableProps {
    labelText?: string;
    icon?: ReactNode;
    hasError?: boolean;
  }

function HeaderLeft() {
  return <DrawerToggleButton />;
}

function HeaderLeftBack() {
  const navigation = useNavigation();
  return (
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
      >
          <Ionicons
              name="chevron-back"
              color={colors.PRIMARY}
              size={25}
          />
      </Pressable>
  );
}

function HeaderButton({
  labelText,
  icon,
  hasError = false,
  ...props
}: HeaderButtonProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable disabled={hasError} style={styles.container} {...props}>
      {!labelText && icon}
      {!icon && labelText && (
        <Text style={[styles.text, hasError && styles.textError]}>
          {labelText}
        </Text>
      )}
    </Pressable>
  );
}

const styling = (theme: ThemeMode) => StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: colors[theme].PINK_700,
  },
  textError: {
    color: '#8a8a8a',
  },
});

export  { HeaderLeftBack, HeaderLeft, HeaderButton };
