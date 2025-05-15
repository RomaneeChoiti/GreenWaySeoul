import { createStackNavigator } from '@react-navigation/stack';
import { colors, mapNavigations } from '@/constants';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import AddPostScreen from '@/screens/map/AddPostScreen';
import { HeaderLeft } from '@/components/common/HeaderButtons';
import { useThemeStore } from '@/store/useThemeStore';

export type MapStackParamList = {
    [mapNavigations.MAP_HOME]: undefined;
    [mapNavigations.ADD_POST]: undefined;
}

const Stack = createStackNavigator<MapStackParamList>();


function MapStackNavigator(){
    const { theme } = useThemeStore();

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors[theme].WHITE,
                shadowColor: 'black',
            },
            headerTitleStyle: {
                color: colors[theme].BLACK,
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