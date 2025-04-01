import React from 'react';
import { Dimensions, Pressable, PressableProps, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { colors } from '../constants';

interface CustomButtonProps extends PressableProps{
    label: string;
    variant: 'filled' | 'outlined';
    size?: 'small' | 'medium' | 'large';
    inValid?: boolean;
}

// 화면 크기에 따른 버튼 paddingVertical 값 조정
const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
        label,
        variant,
        size = 'medium',
        inValid = false,
        ...props
    }: CustomButtonProps) {
    return(
        <Pressable
            disabled={inValid}
            style={({pressed}) => [
                styles[variant],
                styles.container,
                styles[size],
                pressed ? styles[`${variant}Pressed`] : styles[variant],
                inValid && styles.inValid,
            ]}
            {...props}>
            <View style={styles[size]}>
                <Text style={[styles[`${variant}Text`] ,styles.text]}>
                    {label}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    filled: {
        backgroundColor: colors.PRIMARY,
    },
    outlined: {
        borderColor: colors.PRIMARY,
        borderWidth: 1,
    },
    inValid: {
        opacity: 0.5,
    },
    small: {
        width: '30%',
        paddingVertical: deviceHeight > 700 ? 6 : 4,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    medium: {
        width: '50%',
        paddingVertical: deviceHeight > 700 ? 8 : 6,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    large: {
        width: '100%',
        paddingVertical: deviceHeight > 700 ? 10 : 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text:{
        fontSize: 16,
        fontWeight: '700',
    },
    filledPressed: {
        backgroundColor: colors.PRIMARY_DARK,
    },
    outlinedPressed: {
        borderColor: colors.PRIMARY_DARK,
        opacity: 0.5,
    },
    filledText: {
        color: colors.WHITE,
    },
    outlinedText: {
        color: colors.PRIMARY,
    },
});

export default CustomButton;