import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import InputField from '../../components/inputField';
import CustomButton from '../../components/customButton';
import useForm from '../../hooks/useForm';
import { validateLogin } from '../../utils';

function LoginScreen(){

    const login = useForm({
        initialValues: { email: '', password: '' },
        validate: validateLogin,
    });
    const handleSubmit = () => {
        console.log(login.values);
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <InputField
                    placeholder="이메일"
                    error={login.errors.email}
                    touched={login.touched.email}
                    inputMode="email"
                    textContentType="emailAddress"
                    {...login.getTextInputProps('email')}

                />
                <InputField
                    placeholder="비밀번호"
                    error={login.errors.password}
                    touched={login.touched.password}
                    {...login.getTextInputProps('password')}
                    secureTextEntry
                />
            </View>

            <CustomButton
                label="로그인"
                variant="filled"
                size="large"
                onPress={() => handleSubmit()}
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