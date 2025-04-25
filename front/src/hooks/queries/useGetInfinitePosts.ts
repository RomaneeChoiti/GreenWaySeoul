import { getPosts, ResponsePost } from '@/api/post';
import { queryKeys } from '@/constants/keys';
import { ResponseError } from '@/types';
import { InfiniteData, QueryKey, useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';

function useGetInfinitePosts(queryOptions?: UseInfiniteQueryOptions<
        ResponsePost[],
        ResponseError,
        InfiniteData<ResponsePost[], number>,
        ResponsePost[],
        QueryKey,
        number
        >,
    ) {
    return useInfiniteQuery({
        queryFn:({pageParam}) => getPosts(pageParam),
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPage) => {
            const lastPost = lastPage[lastPage.length - 1];
            return lastPost ? allPage.length + 1 : undefined;
        },
        ...queryOptions,
    });
}

export default useGetInfinitePosts;
