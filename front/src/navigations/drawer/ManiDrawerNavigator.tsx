import { createDrawerNavigator } from '@react-navigation/drawer';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import MapStackNavigator from '../stack/MapStackNavigator';

const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{
      drawerType: 'front',
    }}>
          <Drawer.Screen
            name="MapHome"
            component={MapStackNavigator}
            options={{
              title: '맵',
            }}
          />
          <Drawer.Screen
            name="FeedHome"
            component={FeedHomeScreen}
            options={{
              title: '피드',
            }}
          />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
