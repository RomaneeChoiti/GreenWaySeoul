import { createStackNavigator } from '@react-navigation/stack';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { feedNavigations } from '@/constants';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import EditPostScreen from '@/screens/feed/EditPostScreen';
import { ResponsePost } from '@/api/post';

export type FeedStackParamList = {
    [feedNavigations.FEED_HOME]: undefined;
    [feedNavigations.FEED_DETAIL]: { id: number; title: string };
    // EditPost: { post: ResponsePost }; // Add EditPost with its parameter type
    [feedNavigations.EDIT_POST]: { post: ResponsePost };
};

const Stack = createStackNavigator<FeedStackParamList>();

export function HeaderLeft() {
    return <DrawerToggleButton />;
}

function FeedStackNavigator(){

    return (
        <Stack.Navigator screenOptions={{
            cardStyle: {
                backgroundColor: 'white',
            },
            headerStyle: {
                backgroundColor: 'white',
                shadowColor: 'black',
            },
            headerTitleStyle: {
                color: 'green',
            },
        }}>
            <Stack.Screen
                name={feedNavigations.FEED_HOME}
                component={FeedHomeScreen}
                options={{
                    headerTitle: '피드',
                    headerLeft: HeaderLeft,
                }}
            />
            <Stack.Screen
                name={feedNavigations.FEED_DETAIL}
                component={FeedDetailScreen}
                options={({ route }) => ({
                    headerTitle: route.params.title, // Use the title from route params
                })}
            />
            <Stack.Screen
                name={feedNavigations.EDIT_POST}
                component={EditPostScreen}
                options={{ title: '게시물 수정' }}
            />
        </Stack.Navigator>
    );
}


export default FeedStackNavigator;
