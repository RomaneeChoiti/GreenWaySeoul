import React, { ReactNode } from 'react';
import { Dimensions, Pressable, PressableProps, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

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
    const {theme} = useThemeStore();
    const styles = styling(theme);
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

const styling = (theme: ThemeMode) =>
    StyleSheet.create({
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
        fontSize: 16,
        fontWeight: '600',
    },
    filledPressed: {
        backgroundColor: colors.PRIMARY,
    },
    outlinedPressed: {
        backgroundColor: colors.PRIMARY,
        opacity: 0.5,
    },
    filledText: {
        color: colors[theme].UNCHANGE_WHITE,
    },
    outlinedText: {
        color: colors[theme].BLACK,
    },
});

export default CustomButton;
