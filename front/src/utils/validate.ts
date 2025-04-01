
type UserInformation = {
    email: string;
    password: string;
};

function validateUser(values: UserInformation){
    const errors =  {
        email: '',
        password: '',
    };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = '이메일 형식이 올바르지 않습니다';
    }

    if (!(values.password.length >= 8 && values.password.length <= 20)) {
        errors.password = '비밀번호는 8자 이상 20자 이하로 입력해주세요';
    }

    return errors;
}

function validateLogin(values: UserInformation){
    return validateUser(values);
}

function validateSignUp(values: UserInformation & {passwordConfirmation: string}){
    const errors = validateUser(values);
    const signUpErrors = { ...errors, passwordConfirmation: '' };

    if (values.password !== values.passwordConfirmation) {
        signUpErrors.passwordConfirmation = '비밀번호가 일치하지 않습니다';
    }

    return signUpErrors;
}

export { validateLogin, validateSignUp};