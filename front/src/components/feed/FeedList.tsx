import { useState, useMemo, useRef, useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import { FilterType } from '@/types/filter';
import FeedItem from './FeedItem';
import FeedFilter from './FeedFilter';

/*
    데이터가 많은양 , 가변적인 데이터 => FlatList
*/
function FeedList(){
    const [selectedFilter, setSelectedFilter] = useState<FilterType>('최신순');
    const flatListRef = useRef<FlatList>(null);

    // 서버에서 기본 데이터 가져오기 (최신순)
    const {
        data: rawPosts,
    } = useGetInfinitePosts();

    // 클라이언트 사이드에서 필터링 적용
    const posts = useMemo(() => {
        if (!rawPosts) {
            return undefined;
        }
        const allPosts = rawPosts.pages.flat();

        switch (selectedFilter) {
            case '최신순':
                // 서버에서 이미 최신순으로 정렬되어 옴
                return rawPosts;

            case '점수순':
                // 점수 높은 순으로 정렬
                const sortedByScore = [...allPosts].sort((a, b) => b.score - a.score);
                return {
                    pages: [sortedByScore],
                    pageParams: rawPosts.pageParams,
                };

            case '하이라이트':
                // 최신순 + 점수 좋은 것: 점수 상위 30%를 먼저, 나머지는 최신순
                const sortedForHighlight = [...allPosts].sort((a, b) => b.score - a.score);
                const topScorePosts = sortedForHighlight.slice(0, Math.ceil(sortedForHighlight.length * 0.3));
                const topScoreIds = new Set(topScorePosts.map(post => post.id));

                const highlightSorted = [...allPosts].sort((a, b) => {
                    const aIsTop = topScoreIds.has(a.id);
                    const bIsTop = topScoreIds.has(b.id);

                    if (aIsTop && !bIsTop) {
                        return -1;
                    }
                    if (!aIsTop && bIsTop) {
                        return 1;
                    }

                    if (aIsTop && bIsTop) {
                        return b.score - a.score; // 둘 다 상위권이면 점수순
                    }

                    // 둘 다 일반이면 최신순
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                });

                return {
                    pages: [highlightSorted],
                    pageParams: rawPosts.pageParams,
                };

            default:
                return rawPosts;
        }
    }, [rawPosts, selectedFilter]);

    // 필터가 변경될 때 FeedList를 첫 번째 아이템으로 스크롤
    useEffect(() => {
        if (flatListRef.current && posts && posts.pages.flat().length > 0) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: false });
        }
    }, [selectedFilter, posts]);

    const handleFilterChange = (filter: FilterType) => {
        setSelectedFilter(filter);
    };

    return (
        <View style={styles.container}>
            <FeedFilter
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
            />
            <FlatList
                ref={flatListRef}
                data={posts?.pages.flat()}
                renderItem={({item}) => <FeedItem post={item} currentFilter={selectedFilter}/>}
                keyExtractor={item => String(item.id)}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollIndicatorInsets={{right: 1}}
                indicatorStyle="black"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default FeedList;
