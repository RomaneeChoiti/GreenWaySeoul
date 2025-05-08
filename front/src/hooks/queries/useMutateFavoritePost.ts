import { updateFavoritePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants/keys";
import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";

function useMutateFavoritePost(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: updateFavoritePost,
        onSuccess: (updateId) => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.POST, queryKeys.GET_POST, updateId],
            });
        },
        ...mutationOptions,
    });

}

export default useMutateFavoritePost;