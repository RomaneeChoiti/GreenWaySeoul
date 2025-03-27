import React from 'react';
import {  SafeAreaView, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import { authNavigations } from '../../constants';
import CustomButton from '../../components/customButton';

type AuthHomeScreenProps = StackScreenProps<
    AuthStackParamList
    , typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <CustomButton
          label="로그인으로 이동"
          variant="filled"
          size="large"
          onPress={()=> navigation.navigate(authNavigations.LOGIN)}
        />
        <CustomButton
          label="회원가입하기"
          variant="outlined"
          size="large"
          onPress={()=> navigation.navigate(authNavigations.SIGNUP)}
        />

      </View>
    </SafeAreaView>
  );
}

export default AuthHomeScreen;