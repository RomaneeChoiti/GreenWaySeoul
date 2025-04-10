import { createDrawerNavigator } from '@react-navigation/drawer';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import MapStackNavigator from '../stack/MapStackNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import { Dimensions } from 'react-native';
import CustomDrawerContent from './CustomDrawerContent';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

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
            name="MapHome"
            component={MapStackNavigator}
            options={{
              title: '맵',
              drawerIcon: ({ focused }) => getDrawerIcon('map', focused),
            }}
          />
          <Drawer.Screen
            name="FeedHome"
            component={FeedHomeScreen}
            options={{
              title: '피드',
              drawerIcon: ({ focused }) => getDrawerIcon('book', focused),
            }}
          />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
