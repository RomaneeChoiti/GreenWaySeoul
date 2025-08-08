import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ResponsePost } from '@/api/post';
import { feedNavigations } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { formatDate } from '@/utils/date';
import { getImageByPostId } from '@/utils/imageUtils';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import ImageWithTextOverlay from '@/components/common/ImageWithTextOverlay';
import { useRef, useEffect } from 'react';

// 이미지 크기 상수 정의
const FEED_IMAGE_SIZE = {
    width: Dimensions.get('screen').width - 270,
    height: Dimensions.get('screen').width * 0.4,
};

interface FeedCarouselProps {
    posts: ResponsePost[];
    currentFilter?: string;
}

type Navigation = StackNavigationProp<FeedStackParamList>;

function FeedCarousel({ posts, currentFilter }: FeedCarouselProps) {
    const { theme } = useThemeStore();
    const styles = styling(theme);
    const scrollViewRef = useRef<ScrollView>(null);
    const navigation = useNavigation<Navigation>();

    // 캐러셀에 표시할 포스트들 (최대 3개)
    const carouselPosts = posts.slice(0, 3);

    // 컴포넌트가 마운트되거나 posts나 필터가 변경될 때 스크롤 위치 초기화
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, animated: false });
        }
    }, [posts, currentFilter]);

    const handlePressFeed = (post: ResponsePost) => {
        navigation.navigate(feedNavigations.FEED_DETAIL, { id: post.id, title: post.title });
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.carousel}
                contentContainerStyle={styles.carouselContent}
                scrollEnabled={true}
                nestedScrollEnabled={true}
                directionalLockEnabled={true}
                alwaysBounceVertical={false}
                alwaysBounceHorizontal={true}
                bounces={true}
                decelerationRate="fast"
                snapToInterval={FEED_IMAGE_SIZE.width + (Dimensions.get('screen').width * 0.02)}
                snapToAlignment="start"
                scrollEventThrottle={16}
                disableIntervalMomentum={true}
            >
                {carouselPosts.map((post, index) => {
                    // 포스트에 실제 이미지가 있으면 사용하고, 없으면 기본 이미지 사용
                    const postImage = post.images && post.images.length > 0
                        ? { uri: post.images[0].uri }
                        : getImageByPostId(post.id);

                    return (
                        <Pressable key={`${post.id}-${index}`} style={styles.imageItem} onPress={() => handlePressFeed(post)}>
                            <ImageWithTextOverlay
                                source={postImage}
                                text={post.title}
                                date={formatDate(post.date)}
                                width={FEED_IMAGE_SIZE.width}
                                height={FEED_IMAGE_SIZE.height}
                            />
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styling = (_theme: ThemeMode) =>
    StyleSheet.create({
        container: {
            width: Dimensions.get('screen').width,
            height: FEED_IMAGE_SIZE.height,
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        carousel: {
            height: FEED_IMAGE_SIZE.height,
            width: '100%',
        },
        carouselContent: {
            alignItems: 'flex-start',
        },
        imageItem: {
            marginRight: Dimensions.get('screen').width * 0.02,
            overflow: 'visible',
        },
    });

export default FeedCarousel;
