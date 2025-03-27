import React from 'react';
import { Dimensions, Pressable, PressableProps, StyleSheet } from 'react-native';
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
            <Text style={[styles[`${variant}Text`] ,styles.text]}>
                {label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        justifyContent: 'center',
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
        paddingVertical: deviceHeight > 700 ? 10 : 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    medium: {
        width: '50%',
        paddingVertical: deviceHeight > 700 ? 12 : 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    large: {
        width: '100%',
        paddingVertical: deviceHeight > 700 ? 15 : 12,
        alignItems: 'center',
        justifyContent: 'center',
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