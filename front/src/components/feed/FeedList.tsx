import { useState, useRef, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Dimensions, Animated } from 'react-native';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import { useFeedFilter } from '@/hooks/useFeedFilter';
import { useFeedPagination } from '@/hooks/useFeedPagination';
import { FilterType } from '@/types/filter';
import FeedCarousel from './FeedCarousel';
import AllFeedItem from './AllFeedItem';
import FeedFilter from './FeedFilter';
import LoadMoreButton from './LoadMoreButton';
import { colors, uiTexts } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';


interface FeedListProps {
    initialFilter?: FilterType;
}

function FeedList({ initialFilter = '최신순' }: FeedListProps){
    const [selectedFilter, setSelectedFilter] = useState<FilterType>(initialFilter);
    const flatListRef = useRef<FlatList>(null);
    const fadeAnimation = useRef(new Animated.Value(1)).current;
    const { theme } = useThemeStore();
    const styles = styling(theme);

    // 서버에서 기본 데이터 가져오기 (최신순)
    const {
        data: rawPosts,
    } = useGetInfinitePosts();

    // 페이지네이션 훅 사용
    const {
        visibleItemsCount,
        isLoadingMore,
        handleLoadMore,
        resetPagination,
    } = useFeedPagination();

    // 필터링 훅 사용
    const posts = useFeedFilter({
        posts: rawPosts?.pages.flat(),
        selectedFilter,
    });

    // 필터가 변경될 때 FeedList를 첫 번째 아이템으로 스크롤
    useEffect(() => {
        if (flatListRef.current && posts && posts.pages.flat().length > 0) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: false });
        }
    }, [selectedFilter, posts]);

    const handleFilterChange = async (filter: FilterType) => {
        if (filter === selectedFilter) {
            return;
        }

        // 페이드 아웃
        Animated.timing(fadeAnimation, {
            toValue: 0.3,
            duration: 150,
            useNativeDriver: true,
        }).start();

        // 필터 변경
        setSelectedFilter(filter);
        resetPagination();

        // 짧은 지연 후 페이드 인
        setTimeout(() => {
            Animated.timing(fadeAnimation, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }, 50);
    };

    // 첫 번째 게시물 (캐로셀용)
    const firstPost = posts?.pages.flat()[0];

    // 표시할 게시물 목록 (visibleItemsCount만큼만)
    const allPosts = posts?.pages.flat() || [];
    const visiblePosts = allPosts.slice(0, visibleItemsCount);
    const hasMore = allPosts.length > visibleItemsCount;

    if (!rawPosts) {
        return null;
    }

    return (
        <View style={styles.container}>
            <FeedFilter
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
            />

            <Animated.View
                style={[
                    styles.contentContainer,
                    { opacity: fadeAnimation },
                ]}
            >
                {/* 캐로셀 부분 */}
                {firstPost && (
                    <FeedCarousel post={firstPost} currentFilter={selectedFilter} />
                )}

                {/* 전체 기록 헤더 */}
                <View style={styles.allFeedHeader}>
                    <Text style={styles.allFeedHeaderText}>{uiTexts.FEED.ALL_RECORDS}</Text>
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

                {/* 더보기 버튼 */}
                <LoadMoreButton
                    hasMore={hasMore}
                    isLoadingMore={isLoadingMore}
                    onPress={handleLoadMore}
                />
            </Animated.View>
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
        contentContainer: {
            flex: 1,
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
    });

export default FeedList;
