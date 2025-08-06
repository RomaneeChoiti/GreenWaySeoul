import { colors, feedTabNavigations } from '@/constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedStackNavigator from '../stack/FeedStackNavigator';
import { useThemeStore } from '@/store/useThemeStore';

export type FeedTabParamList = {
    [feedTabNavigations.FEED_HOME]: undefined;
};

const Tab = createBottomTabNavigator<FeedTabParamList>();

function FeedTabNavigator() {
    const { theme } = useThemeStore();

    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors[theme].WHITE,
                    shadowColor: colors[theme].BLACK,
                },
                headerTitleStyle: {
                    fontSize: 15,
                },
                headerTintColor: colors[theme].BLACK,
                tabBarStyle: {
                    display: 'none', // 탭 바 완전히 숨기기
                },
            }}
        >
            <Tab.Screen
                name={feedTabNavigations.FEED_HOME}
                component={FeedStackNavigator}
                options={{
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}

export default FeedTabNavigator;
