import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ResponsePost } from '@/api/post';
import { feedNavigations } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { formatDate } from '@/utils/date';
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
    post: ResponsePost;
    currentFilter?: string;
}

type Navigation = StackNavigationProp<FeedStackParamList>;

function FeedCarousel({ post, currentFilter }: FeedCarouselProps) {
    const { theme } = useThemeStore();
    const styles = styling(theme);
    const scrollViewRef = useRef<ScrollView>(null);
    const navigation = useNavigation<Navigation>();

    // 컴포넌트가 마운트되거나 post나 필터가 변경될 때 스크롤 위치 초기화
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, animated: false });
        }
    }, [post.id, currentFilter]);

    const handlePressFeed = () => {
        navigation.navigate(feedNavigations.FEED_DETAIL, { id: post.id, title: post.title });
    };

    // TODO: 이미지 업데이트 끝나면 해당 코드 삭제
    const successImageIndex = (post.id % 6) + 1; // 1~6 순환
    const successImages = [
        require('../../assets/natureImgs/1.png'),
        require('../../assets/natureImgs/2.png'),
        require('../../assets/natureImgs/3.png'),
        require('../../assets/natureImgs/4.png'),
        require('../../assets/natureImgs/5.png'),
        require('../../assets/natureImgs/6.png'),
        require('../../assets/natureImgs/7.png'),
    ];

    // 가로에 3개의 이미지 사용
    const carouselImages = [
        successImages[successImageIndex % successImages.length],
        successImages[(successImageIndex + 1) % successImages.length],
        successImages[(successImageIndex + 2) % successImages.length],
    ];

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
                {carouselImages.map((item, index) => (
                    <Pressable key={`${post.id}-${index}`} style={styles.imageItem} onPress={handlePressFeed}>
                        <ImageWithTextOverlay
                            source={item}
                            text={post.title}
                            date={formatDate(post.date)}
                            width={FEED_IMAGE_SIZE.width}
                            height={FEED_IMAGE_SIZE.height}
                        />
                    </Pressable>
                ))}
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
