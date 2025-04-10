import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';

interface PloggingButtonProps {
  userLogin: boolean;
}
function PloggingButton ({ userLogin }: PloggingButtonProps) {
  return userLogin ? (
    <Pressable
      style={({ pressed }) => [
        styles.actionButton,
        pressed && styles.actionButtonPressed,
      ]}
    >
      <View style={styles.buttonBackground}>
        <MaterialIcons name="directions-run" color={colors.WHITE} size={50} />
        <Text style={styles.buttonText}>플로깅 시작</Text>
      </View>
    </Pressable>
  ) : (
    <View style={styles.noLogin}>
      <Text style={styles.buttonText}>로그인 후 플로깅을 즐겨보세요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 90,
    borderRadius: 30,
    shadowColor: colors.SECONDARY,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  actionButtonPressed: {
    transform: [{ scale: 0.95 }],
  },
  buttonBackground: {
    backgroundColor: colors.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noLogin: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 120,
    backgroundColor: colors.PRIMARY,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: colors.SECONDARY,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
});

export default PloggingButton;
