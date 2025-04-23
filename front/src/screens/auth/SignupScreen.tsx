import React, { useRef } from 'react';
import { View, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';
import CustomButton from '@/components/CustomButton';
import { validateSignUp } from '@/utils';
import useAuth from '@/hooks/queries/useAuth';

function SignUpScreen() {
    const passwordRf = useRef<TextInput | null>(null);
    const { signupMutation, loginMutation } = useAuth();
    const passwordConfirmationRf = useRef<TextInput | null>(null);
    const signUp = useForm({
        initialValues: { email: '', password: '', passwordConfirmation: '' },
        validate: validateSignUp,
    });

    const handleSummit = () => {
        const { email, password } = signUp.values;
        signupMutation.mutate({ email, password }, {
                onSuccess: () => loginMutation.mutate(signUp.values),
            },
        );
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
                    onSubmitEditing={handleSummit}
                    secureTextEntry
                />
            </View>
            <CustomButton
                label="회원가입"
                variant="filled"
                size="large"
                onPress={handleSummit}
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
