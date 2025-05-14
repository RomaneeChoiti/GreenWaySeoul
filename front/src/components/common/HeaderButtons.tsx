import { colors } from '@/constants';
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

const styles = StyleSheet.create({
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
    color: colors.ERROR,
  },
  textError: {
    color: '#8a8a8a',
  },
});

export  { HeaderLeftBack, HeaderLeft, HeaderButton };
