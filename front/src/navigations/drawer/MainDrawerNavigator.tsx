import { createDrawerNavigator } from '@react-navigation/drawer';
import MapStackNavigator, { MapStackParamList } from '../stack/MapStackNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, mainNavigations } from '@/constants';
import { Dimensions } from 'react-native';
import CustomDrawerContent from './CustomDrawerContent';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import FeedStackNavigator, { FeedStackParamList } from '../stack/FeedStackNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: NavigatorScreenParams<FeedStackParamList>;
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
    }}>
          <Drawer.Screen
            name={mainNavigations.HOME}
            component={MapStackNavigator}
            options={{
              title: '맵',
              drawerIcon: ({ focused }) => getDrawerIcon('map', focused),
              headerShown: false, // Disable the parent header for MapStackNavigator
            }}
          />
          <Drawer.Screen
            name={mainNavigations.FEED}
            component={FeedStackNavigator}
            options={{
              title: '피드',
              drawerIcon: ({ focused }) => getDrawerIcon('book', focused),
              headerShown: false,
            }}
          />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
