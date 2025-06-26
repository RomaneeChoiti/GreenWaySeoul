import InputField from '@/components/common/InputField';
import EditProfileHeaderRight from '@/components/setting/EditProfileHeaderRight';
import { colors, errorMessages, settingNavigations } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import { SettingStackParamList } from '@/navigations/stack/SettingStackNavigator';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { validateEditProfile } from '@/utils';
import { StackScreenProps } from '@react-navigation/stack';
import { useEffect } from 'react';
import { Image, Keyboard, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

type EditProfileScreenProps = StackScreenProps<SettingStackParamList>

function EditProfileScreen({navigation}: EditProfileScreenProps) {
    const { theme } = useThemeStore();
    const styles = styling(theme);
    const { getProfileQuery, profileMutation } = useAuth();
    const { nickname, imageUri, kakaoImageUri } = getProfileQuery.data || {};
    const imageOption = useModal();
    const imagePicker = useImagePicker({
        initialImages: imageUri ? [{uri : imageUri}] : [],
        mode: 'single',
        onSettled: imageOption.hide,
    });

    const editProfile = useForm({
        initialValues: { nickname: nickname ?? ''},
        validate: validateEditProfile,
    });

    const handleImage = () => {
        imageOption.show();
        Keyboard.dismiss();
    };

    const handleSubmit = () => {
        profileMutation.mutate({
            ...editProfile.values,
            imageUri: imagePicker.imageUris[0]?.uri,
        },{
            onSuccess: () =>
                Toast.show({
                    type: 'success',
                    text1: '프로필 수정이 완료되었습니다.',
                    position: 'bottom',
                }),
            onError: error =>
                Toast.show({
                    type: 'error',
                    text1: error.response?.data.message || errorMessages.UNKNOWN_ERROR,
                    position: 'bottom',
                }),
        });
    };

    const handleDeleteAccount = () => {
        navigation.navigate(settingNavigations.DELETE_ACCOUNT);
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => EditProfileHeaderRight(handleSubmit),
        });
    },[handleSubmit]);

  return (
    <View style={styles.container}>
        <View style={styles.profileImageContainer}>
            <Pressable
                style={[styles.imageContainer, styles.emptyImageContainer]}
                onPress={() => {
                    // TODO : 프로필 이미지 수정 기능 구현 후 주석 해제
                    // {handleImage}
                    Toast.show({
                        type: 'info',
                        text1: '프로필 이미지 수정은 현재 사용할 수 없습니다.',
                        position: 'bottom',
                    });
                }}
            >
                {imagePicker.imageUris.length === 0 && !kakaoImageUri && (
                    <Ionicons name="camera-outline" color={'gray'} size={30}/>
                )}
                {imagePicker.imageUris.length > 0 && kakaoImageUri && (
                    <Image
                        source={{ uri: `${
                                    Platform.OS === 'ios'
                                    ? 'http://localhost:3030'
                                    : 'http://10.0.2.2:3030'
                                }/${kakaoImageUri}`}}
                        style={styles.image}
                        resizeMode="cover"
                    />
                )}
                {imagePicker.imageUris.length > 0 && (
                    <Image
                        source={{ uri: `${
                                    Platform.OS === 'ios'
                                    ? 'http://localhost:3030'
                                    : 'http://10.0.2.2:3030'
                                }/${imagePicker.imageUris[0]?.uri}`}}
                        style={styles.image}
                        resizeMode="cover"
                    />
                )}
            </Pressable>
        </View>
        <InputField
            {...editProfile.getTextInputProps('nickname')}
            error={editProfile.errors.nickname}
            touched={editProfile.touched.nickname}
            placeholder="닉네임을 입력해주세요"
        />
        {/* TODO: 프로필 미구현으로 막음. */}
        {/* <EditProfileImageOption
            isVisible={imageOption.isVisible}
            hideOption={imageOption.hide}
            onChangeImage={imagePicker.handleChange}
        /> */}
        <Pressable style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteButtonText}>회원탈퇴</Text>
        </Pressable>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
    StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: colors[theme].WHITE,
    },
    profileImageContainer:{
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    imageContainer:{
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    image:{
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    emptyImageContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 1,
        backgroundColor: colors[theme].WHITE,
        borderColor: colors[theme].GRAY_500,
    },
    deleteButton: {
        position: 'absolute', // 절대 위치 설정
        bottom: 60, // 하단 여백
        right: 30, // 오른쪽 여백
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: colors[theme].PINK_700,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: colors[theme].WHITE,
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default EditProfileScreen;
