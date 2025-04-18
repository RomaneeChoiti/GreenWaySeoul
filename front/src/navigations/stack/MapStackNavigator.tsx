import { createStackNavigator } from '@react-navigation/stack';
import { mapNavigations } from '@/constants';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import AddPostScreen from '@/screens/map/AddPostScreen';

export type MapStackParamList = {
    [mapNavigations.MAP_HOME]: undefined;
    [mapNavigations.ADD_POST]: undefined;
}

const Stack = createStackNavigator<MapStackParamList>();

function MapStackNavigator(){
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
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
                name={mapNavigations.MAP_HOME}
                component={MapHomeScreen}
                options={{
                    headerTitle:'Find Your Way',
                }}
            />
            <Stack.Screen
                name={mapNavigations.ADD_POST}
                component={AddPostScreen}
            />

        </Stack.Navigator>
    );
}


export default MapStackNavigator;