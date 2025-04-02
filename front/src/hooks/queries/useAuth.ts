import { useMutation } from '@tanstack/react-query';
import { postSignup } from '../../api/us';
import { UseMutationCustomOptions } from './common';
import { setEncryptStorage } from '../../utils';
import axiosInstance from '../../api/axios';
import { setHeader } from '../../utils/header';

/*
    5버전에서는 Mutation 옵션들은 객체인 메서드로 받는다.

    1. useMutation을 쓰는 이유
        -
    2. Custom을 하는 이유

    3.
*/



function useSignup(mutationOptions ? : UseMutationCustomOptions) {
 return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
 });
}

function useLogin(){
    return useMutation({
        mutationFn: postLogin,
        onSuccess: ({accessToken, refreshToken}) => {
            setEncryptStorage('accessToken', refreshToken);
            setHeader('Authorization', `Bearer ${accessToken}`);
        },
    });
}