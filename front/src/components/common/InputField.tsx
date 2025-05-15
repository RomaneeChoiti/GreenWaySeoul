import React, { ForwardedRef, forwardRef, ReactNode, useRef } from 'react';
import { Dimensions, StyleSheet, TextInput, View, TextInputProps, Pressable, Text } from 'react-native';
import { colors } from '@/constants';
import { mergeRefs } from '@/utils';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface InputFieldProps extends TextInputProps {
    disabled?: boolean;
    error?: string;
    touched?: boolean;
    icon?: ReactNode;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = forwardRef(({
        disabled = false,
        error,
        touched,
        icon = null,
        ...props
    }:InputFieldProps,
    ref?: ForwardedRef<TextInput>,
) => {
    const { theme } = useThemeStore();
    const styles = styling(theme);
    // ref : 접근을 위한 참조
    const innerRef = useRef<TextInput | null>(null);
    const handlePressInput = () => {
        innerRef.current?.focus();
    };

  return (
    <Pressable onPress={handlePressInput}>
        <View
            style={[
                styles.container,
                disabled && styles.disabled,
                props.multiline && styles.multiline,
                touched && Boolean(error) && styles.inputError,
                ]}>
            {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
            <View style={Boolean(icon) && styles.iconContainer}>
                {icon}
                <TextInput
                    ref={ref ? mergeRefs(innerRef, ref) : innerRef}
                    editable={!disabled}
                    placeholderTextColor={colors[theme].GRAY_700}
                    style={styles.input}
                    autoCapitalize="none"
                    spellCheck={false}
                    autoCorrect={false}
                    {...props}
                />
            </View>
        </View>
    </Pressable>
  );
});

const styling = (theme: ThemeMode) =>
    StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        padding: deviceHeight > 700 ? 15 : 10,
    },
    input: {
        fontSize: 16,
        color: colors[theme].BLACK,
        padding: 0,
    },
    disabled: {
        backgroundColor: 'gray',
    },
    inputError: {
        borderColor: colors[theme].PINK_500,
    },
    error: {
        color: colors[theme].PINK_700,
        fontSize: 12,
        marginBottom: 5,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    multiline: {
        height: deviceHeight > 700 ? 100 : 80,
    },
});

export default InputField;
