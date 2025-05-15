import SettingItems from '@/components/setting/SettingItems';
import Accordion from '@/components/common/Accordion';
import { appInfo, colors, settingNavigations, userSetting } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import { SettingStackParamList } from '@/navigations/stack/SettingStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useModal from '@/hooks/useModal';
import DarkModeOption from '@/components/setting/DarkModeOption';

type SettingHomeScreenProps = StackScreenProps<SettingStackParamList>;

function SettingHomeScreen({ navigation }: SettingHomeScreenProps) {
    const { logoutMutation } = useAuth();
    const darkModeOptions = useModal();

    const handleProfile = () => {
        navigation.navigate(settingNavigations.EDIT_PROFILE);
    };

    const handleLogout = () => {
        logoutMutation.mutate(null);
    };

    const handleDarkMode = () => {
        darkModeOptions.show();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <SettingItems
                    title="프로필 수정"
                    subTitle="회원정보를 수정합니다."
                    onPress={handleProfile}
                />
                <SettingItems
                    title="다크모드"
                    onPress={handleDarkMode}
                />
                <Accordion title="앱 정보 및 지원" data={appInfo} />
                <Accordion title="사용자 관련 설정" data={userSetting} />
                <View style={styles.space} />
                <SettingItems
                    title="로그아웃"
                    color={colors.ERROR}
                    onPress={handleLogout}
                    icon={
                        <Ionicons
                            name="log-out-outline"
                            size={20}
                            color={colors.ERROR}
                        />
                    }
                />
                <DarkModeOption
                    isVisible={darkModeOptions.isVisible}
                    hideOption={darkModeOptions.hide}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    space: {
        height: 10,
    },
});

export default SettingHomeScreen;
