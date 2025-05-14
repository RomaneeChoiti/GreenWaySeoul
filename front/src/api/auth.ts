import { getEncryptStorage } from '@/utils/encryptStorage';
import axiosInstance from './axios';
import { Profile } from '@/types/domain';

type RequestUser = {
    email: string;
    password: string;
}

type ResponseToken = {
    accessToken: string;
    refreshToken: string;
}

const postSignup = async ({email, password}:RequestUser): Promise<void> => {
    const {data} = await axiosInstance.post('/auth/signup', {
        email,
        password,
    });
    return data;
};


type RequestProfile = Omit<
    Profile,
    'id' | 'email' | 'kakaoImageUri' | 'loginType'
>

const editProfile = async (body: RequestProfile): Promise<RequestProfile> => {
    const {data} = await axiosInstance.patch('/auth/me', body);
    return data;
};

const postLogin = async ({email, password}:RequestUser): Promise<ResponseToken> => {
    const { data } = await axiosInstance.post('/auth/signin', {
        email,
        password,
    });
    return data;
};

const kakaoLogin = async (token: string): Promise<ResponseToken> => {
    const { data } = await axiosInstance.post('/auth/oauth/kakao', {token});
    return data;
};

type RequestAppleIdentity = {
    identityToken: string;
    appleId: string;
    nickname: string | null;
}

const appleLogin = async(body: RequestAppleIdentity): Promise<ResponseToken> =>{
    const { data } = await axiosInstance.post('/auth/oauth/apple', body);
    return data;
};


const getProfile = async (): Promise<Profile> => {
    const { data } = await axiosInstance.get('/auth/me');
    return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
    const refreshToken = await getEncryptStorage('refreshToken');
    const { data } = await axiosInstance.get('/auth/refresh', {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });
    return data;
};

const logout = async () => {
    await axiosInstance.post('/auth/logout');
};

export { postSignup, postLogin, getProfile, getAccessToken, logout, kakaoLogin, appleLogin, editProfile };
export type { RequestUser, ResponseToken, RequestAppleIdentity, RequestProfile };
