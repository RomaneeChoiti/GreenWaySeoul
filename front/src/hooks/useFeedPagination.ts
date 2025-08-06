import { useState } from 'react';

export function useFeedPagination() {
    const [visibleItemsCount, setVisibleItemsCount] = useState(4); // 처음에 4개만 보여주기
    const [isLoadingMore, setIsLoadingMore] = useState(false); // 더보기 로딩 상태

    const handleLoadMore = async () => {
        if (isLoadingMore) {
            return; // 이미 로딩 중이면 무시
        }

        setIsLoadingMore(true);

        // 로딩 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 500)); // 0.5초 딜레이

        // 4개의 아이템을 하나씩 순차적으로 추가
        for (let i = 1; i <= 4; i++) {
            await new Promise(resolve => setTimeout(resolve, 300)); // 각 아이템마다 0.3초 간격
            setVisibleItemsCount(prev => prev + 1);
        }

        setIsLoadingMore(false);
    };

    const resetPagination = () => {
        setVisibleItemsCount(4); // 필터 변경 시 다시 4개만 보여주기
    };

    return {
        visibleItemsCount,
        isLoadingMore,
        handleLoadMore,
        resetPagination,
    };
}
