import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAccessToken, getProfile, postLogin, postSignup } from '@/api/auth';
import { removeEncryptStorage, setEncryptStorage } from '@/utils/encryptStorage';
import { removeHeader, setHeader } from '@/utils/header';
import queryClient from '@/api/queryClient';
import { UseMutationCustomOptions, UseQueryCustomOptions } from '@/types';

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
            queryClient.invalidateQueries({queryKey: ['auth', 'getProfile']});
        },
        ...mutationOptions,
    });
}

// refeshToken으로 accessToken을 갱신하는 훅
function useGetRefreshToken() {
    const {isSuccess, data, isError} = useQuery({
        queryKey: ['auth', 'getAccessToken'],
        queryFn: getAccessToken,
        /*
            TODO
                1. 로그인을 한 번하면 캐시를 지우지 않는 이상 계속 로그인 되게끔.
        */
        staleTime: 1000 * 60 * 30, // 시간 주기
        refetchInterval: 1000 * 60 * 30,
        refetchOnReconnect: true,
        refetchIntervalInBackground: true,
    });

    useEffect(() => {
        if (isSuccess) {
            setHeader('Authorization', `Bearer ${data.accessToken}`);
            setEncryptStorage('refreshToken', data.refreshToken); // 갱신
        }
    },[isSuccess, data?.accessToken, data?.refreshToken]);

    // 실패한다면
    useEffect(() => {
        if (isError) {
            removeHeader('Authorization');
            removeEncryptStorage('refreshToken');
        }
    }, [isError]);

    return {isSuccess, isError};
}


function useGetProfile(queryOptions? : UseQueryCustomOptions){
    return useQuery({
        queryKey: ['auth', 'getProfile'],
        queryFn: getProfile,
        ...queryOptions,
    });
}

function useAuth(){
    const signupMutation = useSignup();
    const refreshTokenQuery = useGetRefreshToken();
    const getProfileQuery = useGetProfile({
        enabled: refreshTokenQuery.isSuccess,
    });
    const isLogin = getProfileQuery.isSuccess;
    const loginMutation = useLogin();

    return { signupMutation, loginMutation, isLogin, getProfileQuery };

}

export default useAuth;
