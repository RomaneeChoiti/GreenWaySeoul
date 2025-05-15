import { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import FeedItem from './FeedItem';


/*
    데이터가 많은양 , 가변적인 데이터 => FlatList
*/
function FeedList(){
    const {
        data: posts,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useGetInfinitePosts();
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
        />
    );
}

const styles = StyleSheet.create({
    contentContainer:{
        padding: 15,
    },
});

export default FeedList;
