import React, { useRef } from 'react';
import { View, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import InputField from '@/components/inputField';
import useForm from '@/hooks/useForm';
import CustomButton from '@/components/customButton';
import { validateSignUp } from '@/utils';


function SignUpScreen() {
    const passwordRf = useRef<TextInput>(null);
    const passwordConfirmationRf = useRef<TextInput>(null);
    const signUp = useForm({
        initialValues: { email: '', password: '', passwordConfirmation: '' },
        validate: validateSignUp,
    });

    const handleSumbit = () => {
        console.log(signUp.values);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <InputField
                    autoFocus
                    placeholder="이메일"
                    error={signUp.errors.email}
                    touched={signUp.touched.email}
                    inputMode="email"
                    returnKeyType="next"
                    submitBehavior="blurAndSubmit"
                    onSubmitEditing={() => passwordRf.current?.focus()}
                    {...signUp.getTextInputProps('email')}
                />
                <InputField
                    ref={passwordRf}
                    placeholder="비밀번호"
                    error={signUp.errors.password}
                    touched={signUp.touched.password}
                    returnKeyType="next"
                    submitBehavior="blurAndSubmit"
                    onSubmitEditing={() => passwordConfirmationRf.current?.focus()}
                    {...signUp.getTextInputProps('password')}
                    secureTextEntry
                />
                <InputField
                    ref={passwordConfirmationRf}
                    placeholder="비밀번호 확인"
                    error={signUp.errors.passwordConfirmation}
                    touched={signUp.touched.passwordConfirmation}
                    {...signUp.getTextInputProps('passwordConfirmation')}
                    onSubmitEditing={handleSumbit}
                    secureTextEntry
                />
            </View>
            <CustomButton
                label="회원가입"
                variant="filled"
                size="large"
                onPress={handleSumbit}
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


export default SignUpScreen;