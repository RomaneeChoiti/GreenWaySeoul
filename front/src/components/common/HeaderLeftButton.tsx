import { colors } from '@/constants';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function HeaderLeftBack() {
    const navigation = useNavigation();
    return (
        <Pressable
            onPress={() => {
                navigation.goBack();
                }}
        >
            <Ionicons
                name="chevron-back"
                color={colors.PRIMARY}
                size={25}
            />
        </Pressable>
    );
}


function HeaderLeft() {
    return <DrawerToggleButton />;
}

export  { HeaderLeftBack, HeaderLeft };