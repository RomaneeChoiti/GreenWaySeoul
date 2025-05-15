import { createStackNavigator } from '@react-navigation/stack';
import { HeaderLeftBack } from '@/components/common/HeaderButtons';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import { colors, settingNavigations } from '@/constants';
import DeleteAccountScreen from '@/screens/setting/DeleteAccountScreen';
import { useThemeStore } from '@/store/useThemeStore';

export type SettingStackParamList = {
    [settingNavigations.SETTING_HOME]: undefined;
    [settingNavigations.EDIT_PROFILE]: undefined;
    [settingNavigations.DELETE_ACCOUNT]: undefined;
};

const Stack = createStackNavigator<SettingStackParamList>();


function SettingStackNavigator(){
    const { theme } = useThemeStore();

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors[theme].WHITE,
            },
            headerLeft: HeaderLeftBack,
            headerTintColor: colors[theme].BLACK,
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
            <Stack.Screen
                name={settingNavigations.DELETE_ACCOUNT}
                component={DeleteAccountScreen}
                options={{
                    headerTitle: '회원탈퇴',
                }}
            />
        </Stack.Navigator>
    );
}


export default SettingStackNavigator;
