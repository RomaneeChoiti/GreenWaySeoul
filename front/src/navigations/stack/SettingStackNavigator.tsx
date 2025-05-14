import { createStackNavigator } from '@react-navigation/stack';
import { HeaderLeft, HeaderLeftBack } from '@/components/common/HeaderLeftButton';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import { settingNavigations } from '@/constants';

export type SettingStackParamList = {
    [settingNavigations.SETTING_HOME]: undefined;
    [settingNavigations.EDIT_PROFILE]: undefined;
};

const Stack = createStackNavigator<SettingStackParamList>();


function SettingStackNavigator(){

    return (
        <Stack.Navigator screenOptions={{
            cardStyle: {
                backgroundColor: '#f8f8f8',
            },
            headerStyle: {
                backgroundColor: 'white',
                shadowColor: 'black',
            },
            headerLeft: HeaderLeftBack,
        }}>
            <Stack.Screen
                name={settingNavigations.SETTING_HOME}
                component={SettingHomeScreen}
                options={{
                    headerTitle: '설정',
                }}
            />
            <Stack.Screen
                name={settingNavigations.EDIT_PROFILE}
                component={EditProfileScreen}
                options={{
                    headerTitle: '프로필 수정',
                }}
            />
        </Stack.Navigator>
    );
}


export default SettingStackNavigator;
