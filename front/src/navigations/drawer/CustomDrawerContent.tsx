import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, SafeAreaView, Dimensions } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useAuth from '@/hooks/queries/useAuth';
import { colors, mainNavigations, settingNavigations } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';


const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const { theme } = useThemeStore();
    const styles = styling(theme);

    const { getProfileQuery} = useAuth();
    //  TODO: 이미지 업데이트 끝나면 주석 해제
    // const {email, nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};
        const {email, nickname} = getProfileQuery.data || {};



    const handleSetting = () => {
      props.navigation.navigate(mainNavigations.SETTING, {
        screen: settingNavigations.SETTING_HOME,
      });
    };

  return (
    <SafeAreaView {...props} style={styles.container}>
      <View style={styles.userInfoSection}>
        {/* {(() => {
        //  TODO: 이미지 업데이트 끝나면 주석 해제
          if (imageUri) {
            return (
              <Image
                source={{
                  uri: `${
                    Platform.OS === 'ios'
                      ? 'http://localhost:3030'
                      : 'http://10.0.2.2:3030'
                  }/${imageUri}`,
                }}
                style={styles.userImage}
              />
            );
          } else if (kakaoImageUri) {
            return (
              <Image
                source={{
                  uri: `${
                    Platform.OS === 'ios'
                      ? 'http://localhost:3030'
                      : 'http://10.0.2.2:3030'
                  }/${kakaoImageUri}`,
                }}
                style={styles.userImage}
              />
            );
          } else {
            return (
              <Image
                source={require('@/assets/dfUser.png')}
                style={[styles.userImage, styles.dfUserImage]}
              />
            );
          }
        })()} */}
        <Image
          source={require('@/assets/dfUser.png')}
          style={[styles.userImage, styles.dfUserImage]}
        />
        <Text style={styles.userEmail}>{nickname ?? email}</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.buttonMenu}
          onPress={handleSetting}
          >
          <MaterialIcons
            name={'settings'}
            size={30}
            color={colors[theme].GRAY_700}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Dimensions.get('window').height * 0.1,
  },
  userInfoSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  userImage: {
    width: 90,
    height: 90,
    borderRadius: 40,
    marginBottom: 7,
  },
  userEmail: {
    fontSize: 15,
    fontWeight: '400',
    color: colors[theme].BLACK,
  },
  dfUserImage:{
    shadowColor: colors[theme].BLACK,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 'auto',
    padding: 10,
    alignItems: 'flex-end',
  },
  buttonMenu:{
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    gap: 10,
    padding: 10,
  },
});

export default CustomDrawerContent;
