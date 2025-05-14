import SettingItems from '@/components/setting/SettingItems';
import { colors, settingNavigations } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import { SettingStackParamList } from '@/navigations/stack/SettingStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type SettingHomeScreenProps = StackScreenProps<SettingStackParamList>;

function SettingHomeScreen({navigation}: SettingHomeScreenProps) {

    const { logoutMutation } = useAuth();

    const handleProfile = () => {
        navigation.navigate(settingNavigations.EDIT_PROFILE);
    };

    const handleLogout = () => {
        logoutMutation.mutate(null);
    };

    const handleAppInfo = () => {};
    const handleUserSetting = () => {};

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <SettingItems
                title="프로필 수정"
                subTitle="회원정보를 수정합니다."
                onPress={handleProfile}
            />
            <SettingItems
                title="앱 정보 및 지원"
                subTitle="앱 정보를 지원합니다."
                onPress={handleAppInfo}
            />
            <SettingItems
                title="사용자 관련 설정"
                subTitle="위치 및 사진 설정을 수정합니다."
                onPress={handleUserSetting}
            />
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
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,

    },
    space: {
        height: 10,
    },
});

export default SettingHomeScreen;
