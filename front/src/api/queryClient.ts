import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
    /*
        리액트 쿼리는 기본적으로 쿼리와 뮤테이션을 재시도합니다.
        이 설정을 통해 재시도 횟수를 0으로 설정하여 재시도를 비활성화합니다.
    */
    defaultOptions: {
        queries: {
            retry: false,
        },
        mutations: {
            retry: false,
        },
    },
});

export default queryClient;
