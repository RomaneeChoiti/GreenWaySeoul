import { colors, feedNavigations, feedTabNavigations } from '@/constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen';
import FeedStackNavigator from '../stack/FeedStackNavigator';
import {  StyleSheet } from 'react-native';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderLeftBack } from '@/components/common/HeaderLeftButton';

export type FeedTabParamList = {
    [feedTabNavigations.FEED_HOME]: undefined;
    [feedTabNavigations.FEED_FAVORITE]: undefined;
};

const Tab = createBottomTabNavigator<FeedTabParamList>();

function TabBarIcon(route: RouteProp<FeedTabParamList>, focused: boolean) {
    let iconName = '';

    switch (route.name) {
        case feedTabNavigations.FEED_HOME:
            iconName = focused ? 'reader' : 'reader-outline';
            break;
        case feedTabNavigations.FEED_FAVORITE:
            iconName = focused ? 'star' : 'star-outline';
            break;
    }
    return(
        <Ionicons
            name={iconName}
            color={focused ? colors.PRIMARY : 'gray'}
            size={25}
        />
    );
}


function FeedTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#000',
                },
                headerTitleStyle: {
                    fontSize: 15,
                },
                headerTintColor: 'green',
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.PRIMARY,
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopColor: 'gray',
                    borderTopWidth: StyleSheet.hairlineWidth,
                },
                tabBarIcon: ({ focused }) => TabBarIcon(route, focused),
                })}
        >
            <Tab.Screen
                name={feedTabNavigations.FEED_HOME}
                component={FeedStackNavigator}
                options={({route}) => ({
                    headerShown: false,
                    tabBarStyle: (tabRoute => {
                        const routeName = getFocusedRouteNameFromRoute(tabRoute);
                        if(routeName === feedNavigations.FEED_DETAIL ||
                            routeName === feedNavigations.EDIT_POST ||
                            routeName === feedNavigations.IMAGE_SCREEN) {
                            return { display: 'none' };
                        }
                        return {
                            backgroundColor: '#fff',
                            borderTopColor: 'gray',
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
