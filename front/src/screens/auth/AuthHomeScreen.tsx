import {  Dimensions, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { authNavigations } from '@/constants';
import CustomButton from '@/components/common/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import appleAuth, { AppleButton } from '@invertase/react-native-apple-authentication';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';

type AuthHomeScreenProps = StackScreenProps<
    AuthStackParamList,
    typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  const {appleLoginMutation} = useAuth();

  const handlePressAppleLogin = async () => {
    try{
      const { identityToken, fullName } = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      if(identityToken){
        appleLoginMutation.mutate({
          identityToken,
          appId: 'org.reactjs.native.example.GreenWaySeoulRN',
          nickname: fullName?.givenName || null,
        });
      }

    } catch(error){
      if(error.code !== appleAuth.Error.CANCELED){
        Toast.show({
          type: 'error',
          text1: 'Apple 로그인 실패',
          text2: '다시 시도해주세요.',
        });
      }
    }
  };


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
        {Platform.OS === 'ios' && (
          <AppleButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            style={style.appleButton}
            cornerRadius={3}
            onPress={handlePressAppleLogin}
          />
        )}
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
  appleButton: {
    width: Dimensions.get('screen').width - 50,
    height: 60,
  },
});


export default AuthHomeScreen;
