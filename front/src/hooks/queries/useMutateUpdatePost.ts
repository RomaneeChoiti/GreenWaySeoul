import { useMutation } from "@tanstack/react-query";
import { updatePost } from "@/api/post";
import { UseMutationCustomOptions } from "@/types";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants/keys";

function useMutateUpdatePost(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: updatePost,
        onSuccess: (data) => {
            // Invalidate the specific post query to refresh the updated post
            queryClient.invalidateQueries({
                queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [queryKeys.POST, queryKeys.GET_POST, data.id], // Refresh the specific post
            });
        },
        onError: (error) => {
            console.error("Error updating post:", error); // Log the full error object
        },
        ...mutationOptions,
    });
}

export default useMutateUpdatePost;
