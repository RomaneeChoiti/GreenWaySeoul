import { createStackNavigator } from '@react-navigation/stack';
import { mapNavigations } from '@/constants';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import AddPostScreen from '@/screens/map/AddPostScreen';
import { HeaderLeft } from '@/components/common/HeaderLeftButton';

export type MapStackParamList = {
    [mapNavigations.MAP_HOME]: undefined;
    [mapNavigations.ADD_POST]: undefined;
}

const Stack = createStackNavigator<MapStackParamList>();


function MapStackNavigator(){
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
                name={mapNavigations.MAP_HOME}
                component={MapHomeScreen}
                options={{
                    headerTitle: '지도',
                    headerLeft: HeaderLeft,
                }}
            />
            <Stack.Screen
                name={mapNavigations.ADD_POST}
                component={AddPostScreen}
                options={{
                    headerTitle: '오늘의 플로깅 작성',
                }}
            />
        </Stack.Navigator>
    );
}

export default MapStackNavigator;