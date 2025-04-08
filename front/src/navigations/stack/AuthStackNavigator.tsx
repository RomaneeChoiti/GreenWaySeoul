import { createStackNavigator } from '@react-navigation/stack';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import { authNavigations } from '@/constants';
import SignUpScreen from '@/screens/auth/SignupScreen';
import MapHomeScreen from '@/screens/map/MapHomeScreen';

export type AuthStackParamList = {
    [authNavigations.AUTH_HOME]: undefined;
    [authNavigations.MAP]: undefined;
    [authNavigations.LOGIN]: undefined;
    [authNavigations.SIGNUP]: undefined;
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
                    headerTitle:'Find Your Way',
                }}
            />
            {/* 네비게이션 루트 추가 */}
            <Stack.Screen
                name={authNavigations.MAP}
                component={MapHomeScreen}
                options={{headerTitle:'사용해보기'}}
            />
            <Stack.Screen
                name={authNavigations.LOGIN}
                component={LoginScreen}
                options={{headerTitle:'로그인'}}
            />
            <Stack.Screen
                name={authNavigations.SIGNUP}
                component={SignUpScreen}
                options={{headerTitle:'회원가입'}}
            />
        </Stack.Navigator>
    );
}


export default AuthStackNavigator;
