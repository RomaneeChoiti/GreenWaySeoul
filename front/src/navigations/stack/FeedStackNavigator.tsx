import { createStackNavigator } from '@react-navigation/stack';
import { colors, feedNavigations } from '@/constants';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import EditPostScreen from '@/screens/feed/EditPostScreen';
import { ResponsePost } from '@/api/post';
import ImageScreen from '@/screens/feed/imageScreen';
import { HeaderLeftBack } from '@/components/common/HeaderButtons';
import { useThemeStore } from '@/store/useThemeStore';

export type FeedStackParamList = {
    [feedNavigations.FEED_HOME]: undefined;
    [feedNavigations.FEED_DETAIL]: { id: number; title: string };
    [feedNavigations.EDIT_POST]: { post: ResponsePost };
    [feedNavigations.IMAGE_SCREEN]: { index: number };
};

const Stack = createStackNavigator<FeedStackParamList>();


function FeedStackNavigator(){
    const { theme } = useThemeStore();

    return (
        <Stack.Navigator screenOptions={{
            cardStyle: {
                backgroundColor: colors[theme].WHITE,
            },
            headerStyle: {
                backgroundColor: colors[theme].WHITE,
                shadowColor: colors[theme].BLACK,
            },
            headerTitleStyle: {
                color: colors[theme].BLACK,
            },
        }}>
            <Stack.Screen
                name={feedNavigations.FEED_HOME}
                component={FeedHomeScreen}
                options={{
                    headerTitle: '피드',
                    headerLeft: HeaderLeftBack,
                }}
            />
            <Stack.Screen
                name={feedNavigations.FEED_DETAIL}
                component={FeedDetailScreen}
                options={({ route }) => ({
                    headerTitle: route.params.title,
                    headerLeft: HeaderLeftBack,
                })}
            />
            <Stack.Screen
                name={feedNavigations.EDIT_POST}
                component={EditPostScreen}
                options={{
                    headerTitle: '게시물 수정',
                }}
            />
            <Stack.Screen
                name={feedNavigations.IMAGE_SCREEN}
                component={ImageScreen}
                options={{
                    title: ' ',
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}


export default FeedStackNavigator;
