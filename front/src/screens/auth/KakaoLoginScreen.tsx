import { colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import axios from 'axios';
import { useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import { SafeAreaView, StyleSheet } from 'react-native';
import Config from 'react-native-config';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';


const REDIRECT_URI = `${Config.KAKAO_REDIRECT_URI}/auth/oauth/kakao`;
const loginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function KakaoLoginScreen() {
    const {kakaoLoginMutation} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isChangeNavigate, setIsChangeNavigate] = useState(true);
    const navigation = useNavigation();

    const codeHandledRef = useRef(false);


    const requestToken = async (code: string) => {
        try {
            console.log('Requesting token with code:', code);
            console.log('Request parameters:', {
                grant_type: 'authorization_code',
                client_id: Config.KAKAO_REST_API_KEY,
                redirect_uri: REDIRECT_URI,
                code,
            });

            const response = await axios.post('https://kauth.kakao.com/oauth/token', null, {
                params: {
                    grant_type: 'authorization_code',
                    client_id: Config.KAKAO_REST_API_KEY,
                    redirect_uri: REDIRECT_URI,
                    code,
                },
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
            });

            console.log('Token request successful. Response data:', response.data);
            kakaoLoginMutation.mutate(response.data.access_token, {
                onSuccess: (data) => {
                    console.log('Kakao login successful:', data);
                    navigation.goBack();
                },
                onError: (error) => {
                    console.error('Kakao login failed:', error);
                    console.log('Error details:', {
                        message: error.message,
                        stack: error.stack,
                        response: error.response,
                    });
                    setIsChangeNavigate(true);
                },
            });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorData = err.response?.data;
                console.error('Failed to request token:', {
                    message: err.message,
                    status: err.response?.status,
                    data: errorData,
                });
            } else {
                console.error('Unexpected error:', err);
            }
        } finally {
            setIsLoading(false);
            setIsChangeNavigate(false);
        }
    };

    const handleNavigationStateChange = (navState: WebViewNavigation) => {
        if (codeHandledRef.current) {
            return;
        }

        const url = navState.url;
        const matched = url.match(/[?&]code=([^&]+)/);
        if (matched && matched[1]) {
            const code = matched[1];
            codeHandledRef.current = true;
            requestToken(code);
            setIsLoading(true);
            setIsChangeNavigate(true);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            {(isLoading || isChangeNavigate) &&
                <View style={styles.kakaoLoadingContainer}>
                    <ActivityIndicator size={'large'} color={colors.PRIMARY}/>
                </View>}
            <WebView
                source={{ uri: loginUrl }}
                onNavigationStateChange={handleNavigationStateChange}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    kakaoLoadingContainer:{
        backgroundColor: 'rgb(249, 249, 249)',
        height: Dimensions.get('screen').height,
        paddingBottom: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default KakaoLoginScreen;
