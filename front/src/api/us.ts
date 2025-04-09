// import axiosInstance from './axios';
// import { Category, Profile } from '@/types/domain';
// // import { getEncryptStorage } from '../utils';

// type RequestUser = {
//     email: string;
//     password: string;
// }

// type ResponseToken = {
//     accessToken: string;
//     refreshToken: string;
// }

// type ResponseProfile = Profile & Category;


// const postSignup = async ({email, password}:RequestUser): Promise<void> => {
//     const {data} = await axiosInstance.post('/auth/signup', {
//         email,
//         password,
//     });

//     return data;
// };

// const postLogin = async ({email, password}:RequestUser): Promise<ResponseToken> => {
//     const { data } = await axiosInstance.post('/auth/login', {
//         email,
//         password,
//     });

//     return data;
// };

// const getProfile = async (): Promise<ResponseProfile> => {
//     const { data } = await axiosInstance.get('/auth/me');

//     return data;
// };

// const getAccessToken = async (): Promise<ResponseToken> => {
//     const refreshToken = await getEncryptStorage('refreshToken');
//     const { data } = await axiosInstance.get('/auth/refresh', {
//         headers: {
//             Authorization: `Bearer ${refreshToken}`,
//         },
//     });

//     return data;
// };

// const logout = async () => {
//     await axiosInstance.post('/auth/logout');
// };

// export { postSignup, postLogin, getProfile, getAccessToken, logout };
// export type { RequestUser, ResponseToken, ResponseProfile };

