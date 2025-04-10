import { useEffect } from "react";
import { Alert, Linking, Platform } from "react-native";
import { check, Permission, PERMISSIONS, request, RESULTS } from "react-native-permissions";

type PermissionType = 'LOCATION';
type PermissionOS = {
    [key in PermissionType]: Permission;
}

const androidPermission: PermissionOS = {
    LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};

const iosPermission: PermissionOS = {
    LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
};


function usePermission(){

    const showPermission = () =>{
        Alert.alert(
            '위치 권한 허용이 필요합니다.',
            '위치 권한을 허용해주세요.',
            [{
                text:'설정하기',
                onPress: () => Linking.openSettings(),
            },
            {
                text:'취소',
                style:'cancel',
            }],
        );
    };

    useEffect(() => {
        (async () => {
            const isAndroid = Platform.OS === 'android';
            const permissionOS = isAndroid ? androidPermission.LOCATION : iosPermission.LOCATION;

            const checked = await check(permissionOS);

            switch(checked){
                // ANDROID
                case RESULTS.DENIED:
                    if(isAndroid){
                        showPermission();
                        return;
                    }
                    await request(permissionOS);
                    break;
                // IOS
                case RESULTS.BLOCKED:
                case RESULTS.LIMITED:
                    showPermission();
                    break;
                default:
                    break;
            }
        })();
    },[]);
}

export default usePermission;