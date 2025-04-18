import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "./common";
import { createPost } from "@/api/post";


function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: createPost,
        ...mutationOptions,
    });
}

export default useMutateCreatePost;