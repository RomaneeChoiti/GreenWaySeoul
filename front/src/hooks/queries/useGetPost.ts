import { getPost, ResponseSinglePost } from "@/api/post";
import { queryKeys } from "@/constants/keys";
import { UseQueryCustomOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";

function useGetPost(id: number | null, queryOptions?: UseQueryCustomOptions<ResponseSinglePost>) {
  return useQuery({
      queryFn: () => getPost(Number(id)),
      queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
      enabled: Boolean(id),
      ...queryOptions,
  });
}

export default useGetPost;