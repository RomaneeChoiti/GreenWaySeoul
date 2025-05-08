import { updateFavoritePost } from '@/api/post';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants/keys';
import { UseMutationCustomOptions } from '@/types';
import { useMutation } from '@tanstack/react-query';

function useMutateFavoritePost(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: updateFavoritePost,
        onSuccess: updateId => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.POST, queryKeys.GET_POST, updateId],
            });
        // 새로 고침에도 유지되게
            queryClient.invalidateQueries({
                queryKey: [
                    queryKeys.POST,
                    queryKeys.FAVORITE,
                    queryKeys.GET_FAVORITE_POSTS,
                ],
            });
        },
        ...mutationOptions,
    });

}

export default useMutateFavoritePost;