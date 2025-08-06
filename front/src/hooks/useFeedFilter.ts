import { useMemo } from 'react';
import { FilterType } from '@/types/filter';
import { ResponsePost } from '@/api/post';

interface UseFeedFilterProps {
    posts: ResponsePost[] | undefined;
    selectedFilter: FilterType;
}

export function useFeedFilter({ posts, selectedFilter }: UseFeedFilterProps) {
    const filteredPosts = useMemo(() => {
        if (!posts) {
            return undefined;
        }

        switch (selectedFilter) {
            case '최신순':
                // 이미 최신순으로 정렬되어 있다고 가정
                return {
                    pages: [posts],
                    pageParams: [],
                };

            case '점수순':
                // 점수 높은 순으로 정렬
                const sortedByScore = [...posts].sort((a, b) => b.score - a.score);
                return {
                    pages: [sortedByScore],
                    pageParams: [],
                };

            case '하이라이트':
                // isFavorite이 true인 게시물들만 필터링, 없으면 score > 0으로 대체
                const favoritesPosts = posts.filter(post =>
                    post.isFavorite === true || (post.isFavorite === undefined && post.score > 0),
                );
                
                // 좋아요가 있는 게시물이 없으면 모든 게시물을 최신순으로 표시
                if (favoritesPosts.length === 0) {
                    return {
                        pages: [posts],
                        pageParams: [],
                    };
                }
                
                // 좋아요가 있는 게시물들을 점수 높은 순으로 정렬
                const highlightSorted = favoritesPosts.sort((a, b) => {
                    // 점수 높은 순으로 정렬
                    if (a.score !== b.score) {
                        return b.score - a.score;
                    }
                    // 점수가 같으면 최신순으로
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                });

                return {
                    pages: [highlightSorted],
                    pageParams: [],
                };

            default:
                return {
                    pages: [posts],
                    pageParams: [],
                };
        }
    }, [posts, selectedFilter]);

    return filteredPosts;
}
