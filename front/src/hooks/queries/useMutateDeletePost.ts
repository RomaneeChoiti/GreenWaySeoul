import { deletePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants/keys";
import { UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";

function useMutateDeletePost(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
            });
        },
        ...mutationOptions,
    });
}

export default useMutateDeletePost;