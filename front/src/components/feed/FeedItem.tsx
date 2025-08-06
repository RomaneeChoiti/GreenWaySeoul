import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ResponsePost } from '@/api/post';
import { colors, feedNavigations } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { formatDate } from '@/utils/date'; // Import the utility function
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import ImageWithTextOverlay from '@/components/common/ImageWithTextOverlay';

// 이미지 크기 상수 정의
const FEED_IMAGE_SIZE = {
    width: Dimensions.get('screen').width - 270,
    height: Dimensions.get('screen').width * 0.4,
};

interface FeedItemProps {
    post: ResponsePost
}

type Navigation = StackNavigationProp<FeedStackParamList>;

function FeedItem({post}:FeedItemProps){
    const { theme } = useThemeStore();
    const styles = styling(theme);

    const navigation = useNavigation<Navigation>();

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
    <Pressable style={styles.container} onPress={handlePressFeed}>
        <View>
            {/*
                TODO: 이미지 업데이트 끝나면 주석 해제
            {post.images.length > 0 && (
                <FlatList
                    data={post.images}
                    renderItem={renderImageItem}
                    keyExtractor={(item, index) => `${post.id}-${index}`}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(event) => {
                        const index = Math.round(event.nativeEvent.contentOffset.x / imageWidth);
                        setCurrentImageIndex(index);
                    }}
                    getItemLayout={(_, index) => ({
                        length: imageWidth,
                        offset: imageWidth * index,
                        index,
                    })}
                />
            )}
            {post.images.length === 0 && (
                <View style={[styles.imageContainer, styles.emptyImageContainer]}>
                    <Text style={styles.description}>이미지 없음</Text>
                </View>
            )} */}
            {/* TODO: 이미지 업데이트 끝나면 해당 코드 삭제 */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.carousel}
                contentContainerStyle={styles.carouselContent}
                nestedScrollEnabled={true}
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
    );
}

const styling = (_theme: ThemeMode) =>
    StyleSheet.create({
    container:{
        width: Dimensions.get('screen').width,
        height: FEED_IMAGE_SIZE.height + 40, // 이미지 높이 + 패딩
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
    imageItem: {
        marginRight: Dimensions.get('screen').width * 0.02, // 이미지들 사이 간격
        overflow: 'visible',
    },
    emptyImageContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.PRIMARY,
        borderWidth: StyleSheet.hairlineWidth,
    },
});

export default FeedItem;
