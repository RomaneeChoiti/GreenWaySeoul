import { colors, feedTabNavigations } from '@/constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen';
import FeedStackNavigator from '../stack/FeedStackNavigator';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderLeftBack } from '@/components/common/HeaderButtons';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

export type FeedTabParamList = {
    [feedTabNavigations.FEED_HOME]: undefined;
    [feedTabNavigations.FEED_FAVORITE]: undefined;
};

const Tab = createBottomTabNavigator<FeedTabParamList>();

function TabBarIcon(route: RouteProp<FeedTabParamList>, focused: boolean, theme: ThemeMode) {
    let iconName = '';

    switch (route.name) {
        case feedTabNavigations.FEED_HOME:
            iconName = focused ? 'reader' : 'reader-outline';
            break;
        case feedTabNavigations.FEED_FAVORITE:
            iconName = focused ? 'star' : 'star-outline';
            break;
    }
    return (
        <Ionicons
            name={iconName}
            color={focused ? colors.PRIMARY : colors[theme].GRAY_500}
            size={25}
        />
    );
}

function FeedTabNavigator() {
    const { theme } = useThemeStore();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: colors[theme].WHITE,
                    shadowColor: colors[theme].BLACK,
                },
                headerTitleStyle: {
                    fontSize: 15,
                },
                headerTintColor: colors[theme].BLACK,
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.PRIMARY,
                tabBarStyle: {
                    display: 'none', // 탭 바 완전히 숨기기
                },
                tabBarIcon: ({ focused }) => TabBarIcon(route, focused, theme),
            })}
        >
            <Tab.Screen
                name={feedTabNavigations.FEED_HOME}
                component={FeedStackNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name={feedTabNavigations.FEED_FAVORITE}
                component={FeedFavoriteScreen}
                options={{
                    headerTitle: '즐겨찾기',
                    headerLeft: HeaderLeftBack,
                }}
            />
        </Tab.Navigator>
    );
}

export default FeedTabNavigator;
