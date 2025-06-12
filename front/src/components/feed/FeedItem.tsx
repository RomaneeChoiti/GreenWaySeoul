import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ResponsePost } from '@/api/post';
import { colors, feedNavigations } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { formatDate } from '@/utils/date'; // Import the utility function
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

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
        require('../../assets/successImgs/success1.png'),
        require('../../assets/successImgs/success2.png'),
        require('../../assets/successImgs/success3.png'),
        require('../../assets/successImgs/success4.png'),
        require('../../assets/successImgs/success5.png'),
        require('../../assets/successImgs/success6.png'),
    ];
    const successImagePath = successImages[(successImageIndex - 1) % successImages.length];

    return (
    <Pressable style={styles.container} onPress={handlePressFeed}>
        <View>
            {/*
                TODO: 이미지 업데이트 끝나면 주석 해제
            {post.images.length > 0 && (
                <View
                    key = {post.id}
                    style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{uri: post.images[0].uri}}
                        resizeMode="cover"
                    />
                </View>
            )}
            {post.images.length === 0 && (
                <View style={[styles.imageContainer, styles.emptyImageContainer]}>
                    <Text style={styles.description}>이미지 없음</Text>
                </View>
            )} */}
            {/* TODO: 이미지 업데이트 끝나면 해당 코드 삭제 */}
            <View key={post.id} style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={successImagePath}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.date}>
                    {formatDate(post.date)}
                </Text>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.description} numberOfLines={1}>
                    {post.description}
                </Text>
            </View>
        </View>
    </Pressable>
    );
}

const styling = (theme: ThemeMode) =>
    StyleSheet.create({
    container:{
        flex: 1,
        margin: 5,
        marginVertical: 12,
    },
    imageContainer:{
        width: Dimensions.get('screen').width / 2 - 25,
        height: Dimensions.get('screen').width / 2 - 25,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    emptyImageContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.PRIMARY,
        borderWidth: StyleSheet.hairlineWidth,
    },
    textContainer:{
        padding: 10,
        backgroundColor: colors[theme].WHITE,
        width: Dimensions.get('screen').width / 2 - 25,
        borderColor: colors[theme].GRAY_500,
        borderWidth: StyleSheet.hairlineWidth,
    },
    date:{
        fontSize: 12,
        color: colors[theme].GRAY_700,
        marginBottom: 5,
    },
    title:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: colors[theme].BLACK,
    },
    description:{
        fontSize: 14,
        color: colors[theme].GRAY_500,
        marginBottom: 5,
    },
});

export default FeedItem;
