import { colors, feedNavigations, feedTabNavigations } from '@/constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen';
import FeedStackNavigator from '../stack/FeedStackNavigator';
import { StyleSheet } from 'react-native';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';
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
                    backgroundColor: colors[theme].WHITE,
                    borderTopColor: colors[theme].GRAY_700,
                    borderTopWidth: StyleSheet.hairlineWidth,
                },
                tabBarIcon: ({ focused }) => TabBarIcon(route, focused, theme),
            })}
        >
            <Tab.Screen
                name={feedTabNavigations.FEED_HOME}
                component={FeedStackNavigator}
                options={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: (tabRoute => {
                        const routeName = getFocusedRouteNameFromRoute(tabRoute);
                        if (
                            routeName === feedNavigations.FEED_DETAIL ||
                            routeName === feedNavigations.EDIT_POST ||
                            routeName === feedNavigations.IMAGE_SCREEN
                        ) {
                            return { display: 'none' };
                        }
                        return {
                            backgroundColor: colors[theme].WHITE,
                            borderTopColor: colors[theme].GRAY_700,
                            borderTopWidth: StyleSheet.hairlineWidth,
                        };
                    })(route),
                })}
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
