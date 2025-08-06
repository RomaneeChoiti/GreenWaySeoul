import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { ResponsePost } from '@/api/post';
import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import FeedCarousel from './FeedCarousel';

interface FeedItemProps {
    post: ResponsePost;
    currentFilter?: string; // 현재 필터 상태 추가
}

function FeedItem({post, currentFilter}:FeedItemProps){
    const { theme } = useThemeStore();
    const styles = styling(theme);

    return (
        <View style={styles.container}>
            <FeedCarousel post={post} currentFilter={currentFilter} />
            <View style={styles.AllFeedContainer}>
                <Text>
                    전체 기록
                </Text>
            </View>
        </View>
    );
}


const styling = (_theme: ThemeMode) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        AllFeedContainer: {
            borderTopWidth: StyleSheet.hairlineWidth,
            borderColor: colors[_theme].GRAY_700,
            marginTop: Dimensions.get('screen').height * 0.01,
            paddingTop: Dimensions.get('screen').height * 0.01,
        },
    });

export default FeedItem;
