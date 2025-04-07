// import { useMutation, useQuery } from '@tanstack/react-query';
// import { postSignup } from '../../api/us';
// import { UseMutationCustomOptions } from './common';
// import { removeEncryptStorage, setEncryptStorage } from '../../utils';
// import axiosInstance from '../../api/axios';
// import { removeHeader, setHeader } from '../../utils/header';
// import { useEffect } from 'react';
// import queryClient from '../../api/queryClient';

// /*
//     5버전에서는 Mutation 옵션들은 객체인 메서드로 받는다.

//     1. useMutation을 쓰는 이유
//         -
//     2. Custom을 하는 이유

//     3.
// */



// function useSignup(mutationOptions ? : UseMutationCustomOptions) {
//  return useMutation({
//     mutationFn: postSignup,
//     ...mutationOptions,
//  });
// }

// function useLogin(mutationOptions ? : UseMutationCustomOptions) {
//     return useMutation({
//         mutationFn: postLogin,
//         onSuccess: ({accessToken, refreshToken}) => {
//             setEncryptStorage('accessToken', refreshToken);
//             setHeader('Authorization', `Bearer ${accessToken}`);
//         },
//         onSettled: () => {
//             queryClient.refetchQueries({queryKey: ['auth', 'getAccessToken']});
//             queryClient.refetchQueries({queryKey: ['auth', 'getProfile']});
//         },
//         ...mutationOptions,
//     });
// }

// // refeshToken으로 accessToken을 갱신하는 훅
// function useGetRefreshToken() {
//     const {isSuccess, data, isError} = useQuery({
//         queryKey: ['auth', 'getAccessToken'],
//         queryFn: getAccessToken,
//         staleTime: 1000 * 60 * 30 - 1000 * 60 * 3, // 시간 주기
//         refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3,
//         refetchOnReconnect: true,
//         refetchIntervalInBackground: true,
//     });

//     useEffect(() => {
//         if (isSuccess) {
//             setHeader('Authorization', `Bearer ${data.accessToken}`);
//             setEncryptStorage('refreshToken', data.refreshToken); // 갱신
//         }
//     },[isSuccess]);

//     // 실패한다면
//     useEffect(() => {
//         if (isError) {
//             removeHeader('Authorization');
//             removeEncryptStorage('refreshToken');
//         }
//     }, [isError]);

//     return {isSuccess, isError};
// }

// function useGetProfile(){
//     return useQuery({
//         queryKey: ['auth', 'getProfile'],
//         queryFn: getProfile,
//     });
// }

// export { useSignup, useLogin, useGetRefreshToken };