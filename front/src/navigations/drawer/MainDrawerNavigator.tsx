import { createDrawerNavigator } from '@react-navigation/drawer';
import MapStackNavigator, { MapStackParamList } from '../stack/MapStackNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, mainNavigations } from '@/constants';
import { Dimensions } from 'react-native';
import CustomDrawerContent from './CustomDrawerContent';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigatorScreenParams } from '@react-navigation/native';
import FeedTabNavigator, { FeedTabParamList } from '../tab/FeedTabNavigator';
import SettingStackNavigator, { SettingStackParamList } from '../stack/SettingStackNavigator';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: NavigatorScreenParams<FeedTabParamList>;
  [mainNavigations.SETTING]: NavigatorScreenParams<SettingStackParamList>;
}

const Drawer = createDrawerNavigator<MainDrawerParamList>();

const getDrawerIcon = (iconName: string, focused: boolean) => (
    <MaterialIcons name={iconName} color={focused ? colors.PRIMARY : 'gray'} size={30} />
  );

const renderCustomDrawerContent = (props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />;

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
    drawerContent={renderCustomDrawerContent}
    screenOptions={{
      drawerType: 'front',
      swipeEnabled: false,
      drawerStyle: {
        width: Dimensions.get('window').width * 0.655,
      },
      drawerLabelStyle: {
        fontSize: 17.5,
        fontWeight: '600',
        color: colors.BLACK,
      },
      headerShown: false,
    }}>
          <Drawer.Screen
            name={mainNavigations.HOME}
            component={MapStackNavigator}
            options={{
              title: '맵',
              drawerIcon: ({ focused }) => getDrawerIcon('map', focused),
            }}
          />
          <Drawer.Screen
            name={mainNavigations.FEED}
            component={FeedTabNavigator}
            options={{
              title: '피드',
              drawerIcon: ({ focused }) => getDrawerIcon('book', focused),
            }}
          />
          <Drawer.Screen
            name={mainNavigations.SETTING}
            component={SettingStackNavigator}
            options={{
              title: '설정',
              drawerIcon: ({ focused }) => getDrawerIcon('settings', focused),
              drawerItemStyle: { height: 0 }, // Hide the setting screen from the drawer
            }}
          />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
