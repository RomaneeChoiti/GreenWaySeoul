import {  Dimensions, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { authNavigations } from '@/constants';
import CustomButton from '@/components/common/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        <CustomButton
          label="가볍게 시작하기"
          onPress={()=> navigation.navigate(authNavigations.PREVIEW_MAP)}
        />
        <CustomButton
          label="카카오 로그인"
          onPress={()=> navigation.navigate(authNavigations.KAKAO)}
          style={style.kakaoButtonContainer}
          textStyle={style.kakaoButtonText}
          icon={
            <Ionicons name={'chatbubble-sharp'} color={'#181500'} size={16}/>
          }
        />
        <CustomButton
          label="이메일 로그인"
          onPress={()=> navigation.navigate(authNavigations.LOGIN)}
        />
        <Pressable
          onPress={()=> navigation.navigate(authNavigations.SIGNUP)}
        >
          <Text style={style.emailText}>이메일로 가입하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
    justifyContent: 'center',
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
    alignItems: 'center',
  },
  kakaoButtonContainer:{
    backgroundColor: '#FEE500',
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  kakaoButtonText:{
    color: '#181500',
    fontSize: 17,
  },
  emailText:{
    textDecorationLine: 'underline',
    fontWeight: '500',
    padding: 10,
    color: '#181600',
  },
});


export default AuthHomeScreen;
