import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const kakaoImageUrl = null; // kakao 로그인 미구현 상태

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoSection}>

        {kakaoImageUrl === null && (
        <Image
          source={require('@/assets/dfUser.png')} // Replace with actual user image URL
          style={styles.userImage}
        />
        )}
        <Text style={styles.userEmail}>user@example.com</Text> {/* Replace with actual user email */}
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  userInfoSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 40,
    marginBottom: 7,
  },
  userEmail: {
    fontSize: 17,
  },
});

export default CustomDrawerContent;