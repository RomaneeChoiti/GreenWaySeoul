import { Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { ResponsePost } from '@/api/post';
import { colors } from '@/constants';

interface FeedItemProps {
    post: ResponsePost
}

function FeedItem({post}:FeedItemProps){
    return (
    <View style={styles.container}>
        <View>
            {post.images.length > 0 && (
                <View
                    key = {post.id}
                    style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: `${
                                Platform.OS === 'ios'
                                    ? 'http://localhost:3030/'
                                    : 'http://10.0.2.2:3030/'
                            }${post.images[0].uri}`,
                        }}
                        resizeMode="cover"
                    />
                </View>
            )}
            {post.images.length === 0 && (
                <View style={[styles.imageContainer, styles.emptyImageContainer]}>
                    <Text style={styles.description}>이미지 없음</Text>
                </View>
            )}
            <View style={styles.textContainer}>
                <Text style={styles.date}>
                    {post.date instanceof Date ? post.date.toString() : post.date}
                </Text>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.description} numberOfLines={1}>
                    {post.description}
                </Text>
            </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
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
        borderWidth: 1,
    },
    textContainer:{
        padding: 10,
        backgroundColor: '#fff',
    },
    date:{
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
    },
    title:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description:{
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
});

export default FeedItem;