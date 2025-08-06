import { Dimensions, Pressable, ScrollView, StyleSheet, View, Text } from 'react-native';
import { ResponsePost } from '@/api/post';
import { feedNavigations } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { formatDate } from '@/utils/date'; // Import the utility function
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import ImageWithTextOverlay from '@/components/common/ImageWithTextOverlay';
import { useRef, useEffect } from 'react';

// 이미지 크기 상수 정의
const FEED_IMAGE_SIZE = {
    width: Dimensions.get('screen').width - 270,
    height: Dimensions.get('screen').width * 0.4,
};

interface FeedItemProps {
    post: ResponsePost;
    currentFilter?: string; // 현재 필터 상태 추가
}

type Navigation = StackNavigationProp<FeedStackParamList>;

function FeedItem({post, currentFilter}:FeedItemProps){
    const { theme } = useThemeStore();
    const styles = styling(theme);
    const scrollViewRef = useRef<ScrollView>(null);

    const navigation = useNavigation<Navigation>();

    // 컴포넌트가 마운트되거나 post나 필터가 변경될 때 스크롤 위치 초기화
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, animated: false });
        }
    }, [post.id, currentFilter]); // currentFilter도 의존성에 추가

    const handlePressFeed = () => {
        navigation.navigate(feedNavigations.FEED_DETAIL, { id: post.id, title: post.title }); // Pass title
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
    <View>
        <Pressable style={styles.container} onPress={handlePressFeed}>
            <View>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.carousel}
                    contentContainerStyle={styles.carouselContent}
                    scrollEnabled={true}
                    nestedScrollEnabled={false}
                    directionalLockEnabled={true}
                    alwaysBounceVertical={false}
                    alwaysBounceHorizontal={false}
                    bounces={false}
                    decelerationRate="fast"
                    snapToInterval={FEED_IMAGE_SIZE.width + (Dimensions.get('screen').width * 0.02)}
                    snapToAlignment="start"
                >
                    {carouselImages.map((item, index) => (
                        <View key={`${post.id}-${index}`} style={styles.imageItem}>
                            <ImageWithTextOverlay
                                source={item}
                                text={post.title}
                                date={formatDate(post.date)}
                                width={FEED_IMAGE_SIZE.width}
                                height={FEED_IMAGE_SIZE.height}
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </Pressable>
    </View>
    );
}

const styling = (_theme: ThemeMode) =>
    StyleSheet.create({
    container:{
        width: Dimensions.get('screen').width,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: Dimensions.get('screen').width * 0.05,
    },
    carousel: {
        height: FEED_IMAGE_SIZE.height,
        width: '100%',
    },
    carouselContent: {
        alignItems: 'flex-start',
    },
    imageContainer: {
        width: FEED_IMAGE_SIZE.width,
        height: FEED_IMAGE_SIZE.height,
    },
    imageItem: {
        marginRight: Dimensions.get('screen').width * 0.02,
        overflow: 'visible',
    },
});

export default FeedItem;
