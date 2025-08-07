import React, { useEffect } from 'react';
import { alerts, colors, feedNavigations, mainNavigations, mapNavigations } from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import { formatDate } from '@/utils/date';
import { formatTime } from '@/utils/time';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '@/components/common/CustomButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompositeScreenProps } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { useFeedLocationStore } from '@/store/useLocationStore';
import useModal from '@/hooks/useModal';
import FeedDetailOption from './FeedDetailOption';
import { useDetailPostStore } from '@/store/usePostStore';
import useMutateFavoritePost from '@/hooks/queries/useMutateFavoritePost';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { getImageByPostId } from '@/utils/imageUtils';
import CO2ReductionCard from '@/components/post/CO2ReductionCard';
import StarRating from '@/components/post/StarRating';
import ImageWithBoxOverlay from '@/components/common/ImageWithBoxOverlay';

type FeedDetailScreenProps = CompositeScreenProps<
    StackScreenProps<FeedStackParamList, typeof feedNavigations.FEED_DETAIL>,
    DrawerScreenProps<MainDrawerParamList>
>;

function FeedDetailScreen({ route, navigation }: FeedDetailScreenProps) {
    const { theme } = useThemeStore();
    const styles = styling(theme);

    const { id } = route.params;
    const { data: post, isPending, isError } = useGetPost(id);
    const insets = useSafeAreaInsets();
    const detailOption = useModal();
    const favoriteMutate = useMutateFavoritePost();

    const { setFeedLocation } = useFeedLocationStore();
    const { setDetailPost } = useDetailPostStore();

    // const { ploggingMinutes, co2Reduction, treeEquivalent } = usePloggingCalculator(ploggingTime);

    useEffect(() => {
        post && setDetailPost(post);
    }, [post, setDetailPost]);

    const handlePressFavorite = () => {
        if (!post) {
            return;
        }
        favoriteMutate.mutate(post.id, {
            onError: () => {
                Alert.alert(
                    alerts.BOOKMARK_POST_ERROR.TITLE,
                    alerts.BOOKMARK_POST_ERROR.DESCRIPTION,
                );
            },
        });
    };

    const handlePressFeedLocation = () => {
        if (!post) {
            return;
        }
        const { latitude, longitude } = post;
        setFeedLocation({ latitude, longitude });
        navigation.navigate(mainNavigations.HOME, {
            screen: mapNavigations.MAP_HOME,
        });
    };

    if (isPending || isError) {
        return null;
    }
    const selectedImage = getImageByPostId(post.id);

    console.log(post.color);

    return (
        <>
            <ScrollView
                style={
                    insets.bottom
                        ? [styles.container, { marginBottom: insets.bottom + 50 }]
                        : [styles.container, styles.scrollNoInsets]
                }
            >
                <View style={styles.detailContent}>
                    <View key={post.id} style={styles.imageContainer}>
                        <ImageWithBoxOverlay
                            source={selectedImage}
                            width={Dimensions.get('screen').width * 0.9}
                            height={Dimensions.get('screen').width * 0.852}
                            text={post.title}
                            date={formatDate(post.date)}
                            address={post.address}
                            time={post.score}
                        />
                    </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{post.title}</Text>
                            <Text style={styles.description}>{post.description}</Text>
                        </View>
                        <View style={styles.scoreContainer}>
                            <CO2ReductionCard
                                ploggingMinutes={post.score}
                                treeEquivalent={post.score}
                                theme={theme}
                                deletePadding={true}
                                deleteLogo={true}
                            />
                            <StarRating
                                treeCount={post.score}
                                showBackground={false}
                                showText={false}
                                tightLogo={true}
                            />
                        </View>
                </View>
            </ScrollView>
            <View style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}>
                <Pressable onPress={detailOption.show}>
                    <Ionicons
                        name="settings-sharp"
                        size={30}
                        color={colors[theme].GRAY_500}
                    />
                </Pressable>
                <View style={[styles.rightGroup, styles.bookmarkContainer]}>
                    <Pressable
                        onPress={handlePressFavorite}>
                        <Octicons
                            name="star-fill"
                            size={30}
                            color={post.isFavorite ? colors.DARK_PRIMARY : colors[theme].UNCHANGE_GRAY_500}
                        />
                    </Pressable>
                </View>
                    <CustomButton
                        label="위치보기"
                        size="medium"
                        variant="filled"
                        onPress={handlePressFeedLocation}
                    />
            </View>
            <FeedDetailOption isVisible={detailOption.isVisible} hideOption={detailOption.hide} />
        </>
    );
}

const styling = (theme: ThemeMode) =>
    StyleSheet.create({
        container: {
            position: 'relative',
            backgroundColor: colors[theme].UNCHANGE_GRAY_300,
        },
        scrollNoInsets: {
            marginBottom: Dimensions.get('screen').height * 0.05,
        },
        detailContent: {
            paddingHorizontal: Dimensions.get('screen').width * 0.05,
            gap: Dimensions.get('screen').width * 0.025,
        },
        imageContainer: {
            flex: 1,
        },
        image: {
            width: '100%',
            height: Dimensions.get('screen').width * 0.852,
            borderRadius: 20,
        },
        descriptionImage: {
            fontSize: 20,
            color: colors[theme].GRAY_700,
        },
        contentContainer: {
            padding: 20,
        },
        textContainer: {
            backgroundColor: colors[theme].WHITE,
            padding: Dimensions.get('screen').width * 0.05,
            borderRadius: 20,
        },
        title: {
            fontSize: 12,
            fontWeight: '800',
            marginBottom: 10,
            color: colors[theme].BLACK,
        },
        description: {
            fontSize: 12,
            marginBottom: 10,
            color: colors[theme].BLACK,
        },
        rowContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        address: {
            color: colors.PRIMARY,
            fontSize: 16,
            marginLeft: 5,
        },
        date: {
            color: colors.PRIMARY,
            fontSize: 16,
            marginLeft: 5,
        },
        dateDetail: {
            color: colors.PRIMARY,
            fontWeight: 'bold',
        },
        scoreContainer: {
            backgroundColor: colors[theme].WHITE,
            borderRadius: 20,
            paddingBottom: Dimensions.get('screen').height * 0.015,
        },
        scoreText: {
            fontSize: 13,
            fontWeight: '800',
            color: colors[theme].BLACK,
        },
        bottomContainer: {
            position: 'absolute',
            backgroundColor: colors[theme].WHITE,
            flexDirection: 'row',
            alignItems: 'center',
            bottom: 0,
            width: '100%',
            paddingTop: Dimensions.get('screen').height * 0.01,
            paddingHorizontal: Dimensions.get('screen').width * 0.05,
            justifyContent: 'space-between',
        },
        tabContainerNoInsets: {
            marginBottom: Dimensions.get('screen').height * 0.01,
        },
        rightGroup: {
            position: 'absolute',
            left: Dimensions.get('screen').width * 0.37,
            bottom: Dimensions.get('screen').height * 0.041,
        },
        bookmarkContainer: {
            backgroundColor: colors[theme].GRAY_200,
            padding: Dimensions.get('screen').width * 0.02,
            borderRadius: 10,
        },
    });

export default FeedDetailScreen;
