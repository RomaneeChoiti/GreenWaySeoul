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
                /**
                 * 하이라이트 필터링 전략:
                 * 1. 우선순위: isFavorite이 명시적으로 true인 게시물
                 * 2. 폴백: isFavorite 데이터가 없는 경우, score > 0인 게시물을 대체로 표시
                 *    (서버에서 좋아요 정보가 누락된 경우를 대비한 임시 로직)
                 * 3. 최종: 조건에 맞는 게시물이 없으면 모든 게시물 표시
                 */

                // 명시적으로 좋아요된 게시물 찾기
                const explicitFavorites = posts.filter(post => post.isFavorite === true);

                if (explicitFavorites.length > 0) {
                    // 명시적 좋아요 게시물이 있는 경우
                    const sortedFavorites = explicitFavorites.sort((a, b) => {
                        if (a.score !== b.score) {
                            return b.score - a.score;
                        }
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    });

                    return {
                        pages: [sortedFavorites],
                        pageParams: [],
                    };
                }

                // TODO: 서버 API 업데이트 후 이 폴백 로직 제거 필요
                // 폴백: isFavorite 정보가 없는 경우 score > 0인 게시물을 사용
                console.warn('[FeedFilter] isFavorite 데이터가 없어 score 기반 폴백 사용');
                const scoreBasedPosts = posts.filter(post =>
                    post.isFavorite === undefined && post.score > 0,
                );

                if (scoreBasedPosts.length > 0) {
                    const sortedScorePosts = scoreBasedPosts.sort((a, b) => {
                        if (a.score !== b.score) {
                            return b.score - a.score;
                        }
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    });

                    return {
                        pages: [sortedScorePosts],
                        pageParams: [],
                    };
                }

                // 마지막 폴백: 조건에 맞는 게시물이 없으면 모든 게시물을 최신순으로 표시
                console.log('[FeedFilter] 하이라이트할 게시물이 없어 전체 게시물 표시');
                return {
                    pages: [posts],
                    pageParams: [],
                };            default:
                return {
                    pages: [posts],
                    pageParams: [],
                };
        }
    }, [posts, selectedFilter]);

    return filteredPosts;
}
