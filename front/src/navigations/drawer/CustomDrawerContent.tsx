import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Platform, SafeAreaView, Dimensions } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useAuth from '@/hooks/queries/useAuth';
import { mainNavigations, settingNavigations } from '@/constants';


const CustomDrawerContent = (props: DrawerContentComponentProps) => {

    const { getProfileQuery} = useAuth();
    const {email, nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};


    const handleSetting = () => {
      props.navigation.navigate(mainNavigations.SETTING, {
        screen: settingNavigations.SETTING_HOME,
      });
    };

  return (
    <SafeAreaView {...props} style={styles.container}>
      <View style={styles.userInfoSection}>
        {(() => {
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
                style={styles.userImage}
              />
            );
          }
        })()}
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
            color={'gray'}
          />
          <Text style={styles.buttonText}>
            설정
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Dimensions.get('window').height * 0.1,
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
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    gap: 10,
    padding: 10,
  },
  buttonText:{
    fontSize: 17,
    fontWeight: '600',
    color: 'gray',
  },
});

export default CustomDrawerContent;