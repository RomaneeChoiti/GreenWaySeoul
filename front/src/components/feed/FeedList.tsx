import { useState, useMemo, useRef, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Dimensions, Pressable, ActivityIndicator } from 'react-native';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import { FilterType } from '@/types/filter';
import FeedCarousel from './FeedCarousel';
import AllFeedItem from './AllFeedItem';
import FeedFilter from './FeedFilter';
import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

/*
    데이터가 많은양 , 가변적인 데이터 => FlatList
*/

interface FeedListProps {
    initialFilter?: FilterType;
}

function FeedList({ initialFilter = '최신순' }: FeedListProps){
    const [selectedFilter, setSelectedFilter] = useState<FilterType>(initialFilter);
    const [visibleItemsCount, setVisibleItemsCount] = useState(4); // 처음에 4개만 보여주기
    const [isLoadingMore, setIsLoadingMore] = useState(false); // 더보기 로딩 상태
    const flatListRef = useRef<FlatList>(null);
    const { theme } = useThemeStore();
    const styles = styling(theme);

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
                // isFavorite이 true인 게시물들만 필터링, 없으면 score > 0으로 대체
                const favoritesPosts = allPosts.filter(post =>
                    post.isFavorite === true || (post.isFavorite === undefined && post.score > 0),
                );
                
                // 좋아요가 있는 게시물이 없으면 모든 게시물을 최신순으로 표시
                if (favoritesPosts.length === 0) {
                    return {
                        pages: [allPosts],
                        pageParams: rawPosts.pageParams,
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
                    pageParams: rawPosts.pageParams,
                };            default:
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
        setVisibleItemsCount(4); // 필터 변경 시 다시 4개만 보여주기
    };

    const handleLoadMore = async () => {
        if (isLoadingMore) {
            return; // 이미 로딩 중이면 무시
        }
    setIsLoadingMore(true);

        // 로딩 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 500)); // 0.5초 딜레이

        // 4개의 아이템을 하나씩 순차적으로 추가
        for (let i = 1; i <= 4; i++) {
            await new Promise(resolve => setTimeout(resolve, 300)); // 각 아이템마다 0.2초 간격
            setVisibleItemsCount(prev => prev + 1);
        }

        setIsLoadingMore(false);
    };

    // 첫 번째 게시물 (캐로셀용)
    const firstPost = posts?.pages.flat()[0];

    // 표시할 게시물 목록 (visibleItemsCount만큼만)
    const allPosts = posts?.pages.flat() || [];
    const visiblePosts = allPosts.slice(0, visibleItemsCount);
    const hasMore = allPosts.length > visibleItemsCount;

    return (
        <View style={styles.container}>
            <FeedFilter
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
            />

            {/* 캐로셀 부분 */}
            {firstPost && (
                <FeedCarousel post={firstPost} currentFilter={selectedFilter} />
            )}

            {/* 전체 기록 헤더 */}
            <View style={styles.allFeedHeader}>
                <Text style={styles.allFeedHeaderText}>전체 기록</Text>
            </View>

            {/* 전체 기록 리스트 */}
            <FlatList
                ref={flatListRef}
                data={visiblePosts}
                renderItem={({item}) => <AllFeedItem post={item} />}
                keyExtractor={item => String(item.id)}
                showsVerticalScrollIndicator={false}
                style={styles.feedList}
            />

            {/* 더보기 버튼 - 오버레이로 표시 */}
            {hasMore && (
                <View style={styles.loadMoreContainer}>
                    <Pressable
                        style={[
                            styles.loadMoreButton,
                            isLoadingMore && styles.loadMoreButtonDisabled,
                        ]}
                        onPress={handleLoadMore}
                        disabled={isLoadingMore}
                    >
                        {isLoadingMore ? (
                            <ActivityIndicator
                                size="small"
                                color={colors[theme].BLACK}
                            />
                        ) : (
                            <Text style={styles.loadMoreText}>more</Text>
                        )}
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styling = (_theme: ThemeMode) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors[_theme].WHITE,
            marginHorizontal: Dimensions.get('screen').width * 0.05,
        },
        allFeedHeader: {
            marginTop: Dimensions.get('screen').height * 0.015,
            paddingVertical: Dimensions.get('screen').height * 0.01,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderColor: colors[_theme].GRAY_700,
            backgroundColor: colors[_theme].WHITE,
        },
        allFeedHeaderText: {
            fontSize: 12,
            fontWeight: '900',
            color: colors[_theme].BLACK,
        },
        feedList: {
            flex: 1,
        },
        loadMoreContainer: {
            position: 'absolute',
            bottom: Dimensions.get('screen').height * 0.03,
            left: 0,
            right: 0,
            alignItems: 'center',
            backgroundColor: 'transparent',
        },
        loadMoreButton: {
            paddingHorizontal: Dimensions.get('screen').width * 0.08,
            paddingVertical: Dimensions.get('screen').height * 0.015,
            backgroundColor: colors.PRIMARY,
            borderRadius: 20,
            elevation: 3, // Android 그림자
            shadowColor: '#000', // iOS 그림자
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        loadMoreButtonDisabled: {
            opacity: 0.6,
        },
        loadMoreText: {
            fontSize: 9,
            fontWeight: '700',
            color: colors[_theme].BLACK,
        },
    });

export default FeedList;
