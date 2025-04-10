import {  Dimensions, Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { authNavigations } from '@/constants';
import CustomButton from '@/components/CustomButton';

type AuthHomeScreenProps = StackScreenProps<
    AuthStackParamList
    , typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.imageContainer}>
        <Image
          resizeMode="contain"
          style={style.image}
          source={require('../../assets/icon.png')}
        />
      </View>
      <View style={style.buttonContainer}>
        {/* 스크린에 사용해보기 버튼 추가 */}
        <CustomButton
          label="사용해보기"
          variant="filled"
          size="large"
          onPress={()=> navigation.navigate(authNavigations.MAP)}
        />
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

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1.5,
    width: Dimensions.get('screen').width / 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer:{
    flex: 1,
    gap: 10,
  },
});


export default AuthHomeScreen;
