import {  Dimensions, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { authNavigations } from '@/constants';
import CustomButton from '@/components/common/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import appleAuth, { AppleButton } from '@invertase/react-native-apple-authentication';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import ViewNow from '@/components/auth/ViewNowButton';
import ImgCoverFlow from '@/components/auth/ImgCoverFlow';

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
          appleId: 'org.reactjs.native.example.GreenWaySeoulRN',
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

  // 이미지 require는 템플릿 리터럴을 사용할 수 없습니다. 배열로 미리 require 하세요.
  const natureImgFiles = [
    require('../../assets/natureImgs/1.png'),
    require('../../assets/natureImgs/2.png'),
    require('../../assets/natureImgs/3.png'),
    require('../../assets/natureImgs/4.png'),
    require('../../assets/natureImgs/5.png'),
    require('../../assets/natureImgs/6.png'),
    require('../../assets/natureImgs/7.png'),
  ];
  const natureImg = natureImgFiles.map(img => ({
    uri: Image.resolveAssetSource(img).uri,
  }));

  return (
    <LinearGradient
      colors={['#8A8A89', '#F0F0EE']}
      locations={[0, 0.54]}
      style={style.gradient}
    >
      <SafeAreaView style={style.container}>
        <View style={style.contentContainer}>
          <View style={style.imageContainer}>
              <ImgCoverFlow images={natureImg}/>
          </View>
          <ViewNow onPress={()=> navigation.navigate(authNavigations.PREVIEW_MAP)} />
        </View>
        <View style={style.buttonContainer}>
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
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Dimensions.get('screen').height * 0.02,
    paddingBottom: Dimensions.get('screen').height * 0.02,
    marginBottom: Dimensions.get('screen').height * 0.005,
  },
  imageContainer:{
    backgroundColor: '#e6e6e2',
    width: '100%',
    borderRadius: 20,
    height: Dimensions.get('screen').height * 0.23,
    overflow: 'hidden',
  },
  buttonContainer: {
    flex: 1,
    gap: Dimensions.get('screen').height * 0.01,
    alignItems: 'center',
  },
  kakaoButtonContainer: {
    backgroundColor: '#FEE500',
    borderRadius: 3,
    paddingVertical: Dimensions.get('screen').height * 0.015,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kakaoButtonText: {
    color: '#181500',
    fontSize: 17,
  },
  emailText: {
    textDecorationLine: 'underline',
    fontWeight: '500',
    padding: 10,
    color: '#181600',
  },
  appleButton: {
    width: Dimensions.get('screen').width - 50,
    height: Dimensions.get('screen').height * 0.08,
  },
});


export default AuthHomeScreen;
