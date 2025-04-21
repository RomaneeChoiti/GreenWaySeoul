import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAccessToken, getProfile, postLogin, postSignup } from '@/api/auth';
import { removeEncryptStorage, setEncryptStorage } from '@/utils/encryptStorage';
import { removeHeader, setHeader } from '@/utils/header';
import queryClient from '@/api/queryClient';
import { UseMutationCustomOptions } from '@/types';

function useSignup(mutationOptions ? : UseMutationCustomOptions) {
 return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
 });
}

function useLogin(mutationOptions ? : UseMutationCustomOptions) {
    return useMutation({
        mutationFn: postLogin,
        onSuccess: ({accessToken, refreshToken}) => {
            setEncryptStorage('accessToken', refreshToken);
            setHeader('Authorization', `Bearer ${accessToken}`);
        },
        onSettled: () => {
            queryClient.refetchQueries({queryKey: ['auth', 'getAccessToken']});
            queryClient.refetchQueries({queryKey: ['auth', 'getProfile']});
        },
        ...mutationOptions,
    });
}

// refeshToken으로 accessToken을 갱신하는 훅
function useGetRefreshToken() {
    const {isSuccess, data, isError} = useQuery({
        queryKey: ['auth', 'getAccessToken'],
        queryFn: getAccessToken,
        staleTime: 1000 * 60 * 30 - 1000 * 60 * 3, // 시간 주기
        refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3,
        refetchOnReconnect: true,
        refetchIntervalInBackground: true,
    });

    useEffect(() => {
        if (isSuccess) {
            setHeader('Authorization', `Bearer ${data.accessToken}`);
            setEncryptStorage('refreshToken', data.refreshToken); // 갱신
        }
    },[isSuccess]);

    // 실패한다면
    useEffect(() => {
        if (isError) {
            removeHeader('Authorization');
            removeEncryptStorage('refreshToken');
        }
    }, [isError]);

    return {isSuccess, isError};
}

function useGetProfile(){
    return useQuery({
        queryKey: ['auth', 'getProfile'],
        queryFn: getProfile,
    });
}

export { useSignup, useLogin, useGetRefreshToken, useGetProfile };
