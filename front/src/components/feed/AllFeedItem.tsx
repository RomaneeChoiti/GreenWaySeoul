import { StyleSheet, View, Text, Dimensions, Image, Pressable } from 'react-native';
import { colors, feedNavigations } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { ResponsePost } from '@/api/post';
import { formatDate } from '@/utils/date';
import { getImageByPostId } from '@/utils/imageUtils';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';

interface AllFeedItemProps {
    post: ResponsePost;
}

type Navigation = StackNavigationProp<FeedStackParamList>;

function AllFeedItem({ post }: AllFeedItemProps) {
    const { theme } = useThemeStore();
    const styles = styling(theme);
    const navigation = useNavigation<Navigation>();

    const handlePressFeed = () => {
        navigation.navigate(feedNavigations.FEED_DETAIL, { id: post.id, title: post.title });
    };

    const selectedImage = getImageByPostId(post.id);

    return (
        <Pressable style={styles.container} onPress={handlePressFeed}>
            <Image source={selectedImage} style={styles.image} />
            <View style={styles.textContainer}>
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>
                        {post.title}
                    </Text>
                    <Text style={styles.date}>
                        {formatDate(post.date)}
                    </Text>
                </View>
                <Text style={styles.content}>
                    {post.description.length > 10
                        ? `${post.description.substring(0, 20)}...`
                        : post.description}
                </Text>
            </View>
        </Pressable>
    );
}

const styling = (_theme: ThemeMode) =>
    StyleSheet.create({
        container: {
            width: Dimensions.get('screen').width,
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: Dimensions.get('screen').width * 0.03,
        },
        image: {
            width: Dimensions.get('screen').width * 0.13,
            height: Dimensions.get('screen').width * 0.13,
            borderRadius: 8,
            marginRight: Dimensions.get('screen').width * 0.03,
        },
        textContainer: {
            flex: 1,
        },
        textWrapper: {
            gap: Dimensions.get('screen').width * 0.02,
            flexDirection: 'row',
        },
        title: {
            fontSize: 12,
            fontWeight: '900',
            color: colors[_theme].BLACK,
            marginBottom: 8,
        },
        date: {
            fontSize: 10,
            color: colors[_theme].BLACK,
        },
        content: {
            fontSize: 14,
            color: colors[_theme].BLACK,
        },
    });

export default AllFeedItem;
