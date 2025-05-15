import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { Pressable, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ImageInPutProps {
    onChange: () => void;
}

function ImageInPut({onChange}:ImageInPutProps) {
    const { theme } = useThemeStore();
    const styles = Styling(theme);

    return(
        <Pressable
            style={({pressed}) => [
                pressed && styles.imageInputPressed,
                styles.imageInput,
            ]}
            onPress={onChange}>
            <Ionicons name="camera-outline" size={20} color={styles.icon.color}/>
            <Text style={styles.inputText}>사진 추가</Text>
        </Pressable>
    );
}

const Styling = (theme: ThemeMode) =>
    StyleSheet.create({
    imageInput : {
        borderWidth: 1.5,
        borderStyle: 'dotted',
        borderColor: colors[theme].GRAY_700,
        height: 70,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    imageInputPressed : {
        opacity: 0.5,
    },
    inputText : {
        fontSize: 15,
        color:  colors[theme].GRAY_700,
    },
    icon:{
        color: colors[theme].GRAY_700,
    },
});

export default ImageInPut;