import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FeedItem from './FeedItem';
import useGetInfiniteFavoritePosts from '@/hooks/queries/useGetInfiniteFavoritePosts';

function FeedFavoriteList(){
    const {
        data: posts,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useGetInfiniteFavoritePosts();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleEndReached = () => {
        if(hasNextPage && !isFetchingNextPage){
        fetchNextPage();
        }
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await refetch();
        setIsRefreshing(false);
    };

    return (
        <FlatList
            data={posts?.pages.flat()}
            renderItem={({item}) => <FeedItem post={item}/>}
            keyExtractor={item => String(item.id)}
            numColumns={2}
            contentContainerStyle={styles.contentContainer}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            scrollIndicatorInsets={{right: 1}}
            indicatorStyle="black"
            ListEmptyComponent={
                <View>
                    <Text>플로깅을 장소들을 저장해보세요</Text>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    contentContainer:{
        padding: 15,
    },
});

export default FeedFavoriteList;
