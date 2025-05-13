import React, { ReactNode } from 'react';
import { Dimensions, Pressable, PressableProps, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { colors } from '@/constants';

interface CustomButtonProps extends PressableProps{
    label: string;
    variant?: 'filled' | 'outlined';
    size?: 'small' | 'medium' | 'large';
    inValid?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    icon?: ReactNode;
}

// 화면 크기에 따른 버튼 paddingVertical 값 조정
const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
        label,
        variant = 'filled',
        size = 'large',
        inValid = false,
        style = null,
        textStyle = null,
        icon = null,
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
                style,
            ]}
            {...props}>
            <View style={styles[size]}>
                {icon}
                <Text style={[styles[`${variant}Text`] ,styles.text, textStyle]}>
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
        gap: 4,
    },
    medium: {
        width: '50%',
        paddingVertical: deviceHeight > 700 ? 8 : 6,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 4,
    },
    large: {
        width: '100%',
        paddingVertical: deviceHeight > 700 ? 10 : 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 4,
    },
    text:{
        fontSize: 20,
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
