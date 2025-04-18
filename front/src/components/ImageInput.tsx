import { Pressable, StyleSheet, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface ImageInPutProps {
    onChange: () => void;
}

function ImageInPut({onChange}:ImageInPutProps) {
    return(
        <Pressable
            style={({pressed}) => [
                pressed && styles.imageInputPressed,
                styles.imageInput,
            ]}
            onPress={onChange}>
            <Ionicons name="camera-outline" size={20} color={'gray'}/>
            <Text style={styles.inputText}>사진 추가</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    imageInput : {
        borderWidth: 1.5,
        borderStyle: 'dotted',
        borderColor: 'gray',
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
        color: 'gray',
    },
});

export default ImageInPut;