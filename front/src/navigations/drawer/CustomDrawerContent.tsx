import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useAuth from '@/hooks/queries/useAuth';


const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const kakaoImageUrl = null; // kakao 로그인 미구현 상태

    const {logoutMutation, getProfileQuery} = useAuth();
    const {email, nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};

    const handleLogout = () => {
      logoutMutation.mutate(null);
    };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.userInfoSection}>
      { kakaoImageUrl === null && (
        <Image
          source={require('@/assets/dfUser.png')} // Replace with actual user image URL
          style={styles.userImage}
        />
        )}
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.userImage}
        />
      )}
      { kakaoImageUri && (
        <Image
          source={{ uri: kakaoImageUri }}
          style={styles.userImage}
        />
      )}
        <Text style={styles.userEmail}>{nickname ?? email}</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.logoutButtonContainer}>
        <Pressable
          onPress={handleLogout}
          style={styles.logoutButton}
          >
          <MaterialIcons name={'logout'}/>
          <Text>로그아웃</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  logoutButtonContainer: {
    marginTop: 'auto',
    alignItems: 'flex-end',
    padding: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    gap: 10,
    padding: 10,
  },
});

export default CustomDrawerContent;