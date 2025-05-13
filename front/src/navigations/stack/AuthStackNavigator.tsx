import { createStackNavigator } from '@react-navigation/stack';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import { authNavigations } from '@/constants';
import SignUpScreen from '@/screens/auth/SignupScreen';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import { HeaderLeftBack } from '@/components/common/HeaderLeftButton';
import KakaoLoginScreen from '@/screens/auth/KakaoLoginScreen';

export type AuthStackParamList = {
    [authNavigations.AUTH_HOME]: undefined;
    [authNavigations.PREVIEW_MAP]: undefined;
    [authNavigations.LOGIN]: undefined;
    [authNavigations.SIGNUP]: undefined;
    [authNavigations.KAKAO]: undefined;
}

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator(){

    return (
        <Stack.Navigator screenOptions={{
            cardStyle: {
                backgroundColor: 'white',
            },
            headerStyle: {
                backgroundColor: 'white',
                shadowColor: 'black',
            },
            headerTitleStyle: {
                color: 'green',
            },
        }}>
            <Stack.Screen
                name={authNavigations.AUTH_HOME}
                component={AuthHomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={authNavigations.PREVIEW_MAP}
                component={MapHomeScreen}
                options={{
                    headerTitle:'내 주변 쓰레기통',
                    headerLeft: HeaderLeftBack,
                }}
            />
            <Stack.Screen
                name={authNavigations.KAKAO}
                component={KakaoLoginScreen}
                options={{
                    headerTitle:'카카오 로그인',
                    headerLeft: HeaderLeftBack,
                }}
            />
            <Stack.Screen
                name={authNavigations.LOGIN}
                component={LoginScreen}
                options={{
                    headerTitle:'로그인',
                    headerLeft: HeaderLeftBack,
                }}
            />
            <Stack.Screen
                name={authNavigations.SIGNUP}
                component={SignUpScreen}
                options={{
                    headerTitle:'회원가입',
                    headerLeft: HeaderLeftBack,
                }}
            />
        </Stack.Navigator>
    );
}


export default AuthStackNavigator;
