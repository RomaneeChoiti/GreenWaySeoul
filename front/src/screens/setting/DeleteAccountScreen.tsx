import CustomButton from '@/components/common/CustomButton';
import { alerts, colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

interface DeleteAccountScreenProps {}

function DeleteAccountScreen({}: DeleteAccountScreenProps) {
    const { deleteAccountMutation } = useAuth();
    const handleDeleteAccount = () => {
        Alert.alert(alerts.DELETE_ACCOUNT.TITLE, alerts.DELETE_ACCOUNT.DESCRIPTION,[
            {
                text: '취소',
                style: 'cancel',
            },
            {
                text: '확인',
                onPress: () => {
                    deleteAccountMutation.mutate(undefined, {
                        onSuccess: () =>
                            Toast.show({
                                type: 'success',
                                text1: alerts.DELETE_ACCOUNT.SUCCESS_TITLE,
                                text2: alerts.DELETE_ACCOUNT.SUCCESS_DESCRIPTION,
                                position: 'bottom',
                            }),
                        onError: error =>
                            Toast.show({
                                type: 'error',
                                text1: error.response?.data.message || alerts.DELETE_ACCOUNT.ERROR_TITLE,
                                position: 'bottom',
                            }),
                    });
                },
                style: 'destructive',
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>저장된 데이터를 모두 삭제히야 {'\n'} 회원탈퇴가 가능합니다.</Text>
                <Text style={styles.infoText}>저장된 데이터를 모두 삭제해주세요.</Text>
            </View>

            <CustomButton label="회원탈퇴" style={styles.deleteButton} onPress={handleDeleteAccount} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginBottom: 20,
    },
    deleteButton: {
        backgroundColor: colors.ERROR,
    },
    infoContainer:{
        alignItems: 'center',
        borderColor: colors.ERROR,
        borderWidth: 1,
        padding: 20,
        gap: 10,
        marginBottom: 20,
    },
    infoText: {
        fontSize: 15,
        color: '#c80000',
        textAlign: 'center',
    },
});

export default DeleteAccountScreen;
