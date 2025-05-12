import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';
import useForm from '@/hooks/useForm';
import { validateLogin } from '@/utils';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import { errorMessages } from '@/constants';

function LoginScreen(){
    const passwordRf = useRef<TextInput | null>(null);
    const {loginMutation} = useAuth();
    const login = useForm({
        initialValues: { email: '', password: '' },
        validate: validateLogin,
    });

    const handleSubmit = () => {
        loginMutation.mutate(login.values, {
            onError: error =>
                Toast.show({
                    type: 'error',
                    text1: error.response?.data.message || errorMessages.UNKNOWN_ERROR,
                    position: 'bottom',
                }),
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <InputField
                    autoFocus
                    placeholder="이메일"
                    error={login.errors.email}
                    touched={login.touched.email}
                    inputMode="email"
                    textContentType="emailAddress"
                    returnKeyType="next"
                    submitBehavior="blurAndSubmit"
                    onSubmitEditing={() => passwordRf.current?.focus()}
                    {...login.getTextInputProps('email')}
                />
                <InputField
                    ref={passwordRf}
                    placeholder="비밀번호"
                    error={login.errors.password}
                    touched={login.touched.password}
                    returnKeyType ="join"
                    submitBehavior="blurAndSubmit"
                    onSubmitEditing={handleSubmit}
                    {...login.getTextInputProps('password')}
                    secureTextEntry
                />
            </View>
            <CustomButton
                label="로그인"
                variant="filled"
                size="large"
                onPress={handleSubmit}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
    inputContainer: {
        gap: 10,
        marginBottom: 20,
    },
});

export default LoginScreen;
