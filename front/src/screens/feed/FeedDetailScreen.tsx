import { colors, feedNavigations } from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import { formatDate } from '@/utils/date'; // Import the utility function
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PreviewImageList from '@/components/common/PreviewImageList';


type FeedDetailScreenProps = StackScreenProps<
    FeedStackParamList,
    typeof feedNavigations.FEED_DETAIL
>;

function FeedDetailScreen({ route }: FeedDetailScreenProps) {
    const { id } = route.params; // Destructure title
    const { data: post, isPending, isError } = useGetPost(id);

    if (isPending || isError) {
        return null;
    }

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                {post.images.length > 0 && (
                    <Image
                        style={styles.image}
                        source={{
                            uri: `${Platform.OS === 'ios'
                                ? 'http://localhost:3030/'
                                : 'http://10.2.2:3030/'
                                }${post.images[0].uri}`,
                        }}
                        resizeMode="cover"
                    />
                )}
                {post.images.length === 0 && (
                    <View style={styles.emptyImageContainer}>
                        <Text style={styles.descriptionImage}>이미지 없음</Text>
                    </View>
                )}
                <View style={styles.contentContainer}>
                    <View style={styles.rowContainer}>
                        <MaterialIcons name="location-on" size={20} color={'green'} />
                        <Text style={styles.address}>{post.address}</Text>
                    </View>
                    <Text style={styles.title}>{post.title}</Text>
                    <View style={styles.rowContainer}>
                        <MaterialIcons name="date-range" size={20} color={'green'} />
                        <Text style={styles.date}>
                            활동 날짜 : {}
                                <Text style={styles.dateDetail}>
                                    {formatDate(post.date)}
                                </Text>
                        </Text>
                    </View>
                    <Text style={styles.description}>{post.description}</Text>
                    <View style={styles.scoreContainer}>
                        <Text style={styles.scoreText}>플로깅 점수</Text>
                        <View style={styles.rowContainer}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Ionicons
                                    key={index}
                                    name="trash-sharp"
                                    size={40}
                                    color={index < post.score ? colors.PRIMARY : 'lightgray'}
                                    style={styles.iconSpacing}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </View>
            {post.images.length > 0 &&
                <View style={styles.postImageContainer}>
                    <PreviewImageList imageUris={post.images}/>
                </View>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 300,
    },
    emptyImageContainer: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptionImage: {
        fontSize: 20,
        color: 'gray',
    },
    contentContainer: {
        padding: 20,
    },
    title:{
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description:{
        fontSize: 16,
        marginBottom: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    address: {
        color: 'green',
        fontSize: 16,
        marginLeft: 5,
    },
    date: {
        color: 'green',
        fontSize: 16,
        marginLeft: 5,
    },
    dateDetail: {
        color:  'green',
        fontWeight : 'bold',
    },
    scoreContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    iconSpacing: {
        marginRight: 5,
    },
    scoreText: {
        fontSize: 18,
        marginBottom: 15,
    },
    postImageContainer: {
        padding: 20,
    },
});

export default FeedDetailScreen;
