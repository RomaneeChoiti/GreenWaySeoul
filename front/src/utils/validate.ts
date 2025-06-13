import Config from 'react-native-config';

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

function validateSignUp(values: UserInformation & {passwordConfirmation: string; recommendationCode: string}){
    const errors = validateUser(values);
    const signUpErrors = { ...errors, passwordConfirmation: '', recommendationCode: '' };

    if (values.password !== values.passwordConfirmation) {
        signUpErrors.passwordConfirmation = '비밀번호가 일치하지 않습니다';
    }

    if (values.recommendationCode !== Config.GWS_RECOMMEND_CODE) {
        signUpErrors.recommendationCode = '추천 코드가 올바르지 않습니다';
    }

    return signUpErrors;
}

function validateAddPost(values: {title: string}){
    const errors = {
        title: '',
        description: '',
    };

    if(values.title.trim() === ''){
        errors.title = '제목을 1~30자 이내로 입력해주세요';
    }

    return errors;
}

function validateEditProfile(values: {nickname: string}){
    const errors = {
        nickname: '',
    };

    if(values.nickname.trim() === ''){
        errors.nickname = '닉네임을 입력해주세요';
    }

    return errors;
}

export { validateLogin, validateSignUp, validateAddPost, validateEditProfile };
