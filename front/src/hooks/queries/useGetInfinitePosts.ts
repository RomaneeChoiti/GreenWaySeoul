import { getPosts, ResponsePost } from '@/api/post';
import { queryKeys } from '@/constants/keys';
import { ResponseError } from '@/types';
import { InfiniteData, QueryKey, useSuspenseInfiniteQuery, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

function useGetInfinitePosts(
    queryOptions?:
    UseSuspenseInfiniteQueryOptions<
        ResponsePost[],
        ResponseError,
        InfiniteData<ResponsePost[], number>,
        ResponsePost[],
        QueryKey,
        number
    >,
    ) {
    return useSuspenseInfiniteQuery({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
        queryFn:({pageParam}) => getPosts(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPage) => {
            const lastPost = lastPage[lastPage.length - 1];
            return lastPost ? allPage.length + 1 : undefined;
        },
        ...queryOptions,
    });
}

export default useGetInfinitePosts;
