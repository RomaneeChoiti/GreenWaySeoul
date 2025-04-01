import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import InputField from '../../components/inputField';
import CustomButton from '../../components/customButton';
import useForm from '../../hooks/useForm';
import { validateLogin } from '../../utils';

function LoginScreen(){
    const login = useForm({
        initialValues: { email: '', password: '' },
        validate: validateLogin,
    });
    const passwordRf = useRef<TextInput>(null);

    const handleSubmit = () => {
        console.log(login.values);
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