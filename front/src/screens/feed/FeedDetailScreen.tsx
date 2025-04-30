import React, { useState } from 'react';
import { colors, feedNavigations, mainNavigations, mapNavigations } from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import { formatDate } from '@/utils/date'; // Import the utility function
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octions from 'react-native-vector-icons/Octicons';
import PreviewImageList from '@/components/common/PreviewImageList';
import CustomButton from '@/components/common/CustomButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompositeScreenProps } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { useFeedLocationStore } from '@/store/useLocationStore';


type FeedDetailScreenProps = CompositeScreenProps<
    StackScreenProps<FeedStackParamList, typeof feedNavigations.FEED_DETAIL>,
    DrawerScreenProps<MainDrawerParamList>
>;

function FeedDetailScreen({ route, navigation }: FeedDetailScreenProps) {
    const { id } = route.params;
    const { data: post, isPending, isError } = useGetPost(id);
    const insets = useSafeAreaInsets();
    const {setFeedLocation} = useFeedLocationStore();
    const [isBookmarked, setIsBookmarked] = useState(false); // 북마크 상태 추가

    const toggleBookmark = () => {
        setIsBookmarked((prev) => !prev); // 상태 토글
    };

    const handlePressFeedLocation = () => {
        if (!post) {return;}
        const { latitude, longitude } = post;
        setFeedLocation({latitude, longitude});
        navigation.navigate(mainNavigations.HOME, {
            screen: mapNavigations.MAP_HOME,
        });
    };

    if (isPending || isError) {
        return null;
    }

    return (
        <>
        <ScrollView style={insets.bottom
            ? [styles.container, {marginBottom: insets.bottom + 50}]
            : [styles.container, styles.scrollNoInsets]
            }>
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
                            활동 날짜 :
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
        <View style={[styles.bottomContainer, {paddingBottom: insets.bottom}]}>
            <View style={[styles.tabContainer, insets.bottom === 0 && styles.tabContainerNoInsets]}>
                <Pressable style={styles.bookmarkContainer} onPress={toggleBookmark}>
                    <Octions
                        name="star-fill"
                        size={30}
                        color={isBookmarked ? colors.PRIMARY : 'gray'} // 색상 변경
                    />
                </Pressable>
                <CustomButton
                    label="위치보기"
                    size="medium"
                    variant="filled"
                    onPress={handlePressFeedLocation}
                />
            </View>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        position: 'relative',
    },
    scrollNoInsets:{
        marginBottom: 65,
    },
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
    bottomContainer:{
        position: 'absolute',
        backgroundColor: colors.WHITE,
        bottom: 0,
        width: '100%',
        alignItems: 'flex-end',
        paddingTop: 10,
        paddingHorizontal: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: 'gray',
    },
    tabContainer:{
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    tabContainerNoInsets:{
        marginBottom: 10,
    },
    bookmarkContainer:{
        height: '100%',
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
});

export default FeedDetailScreen;
