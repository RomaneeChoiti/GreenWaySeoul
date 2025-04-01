import React, { useRef } from 'react';
import { Dimensions, StyleSheet, TextInput, View, TextInputProps, Text, Pressable } from 'react-native';
import { colors } from '../constants';

interface InputFieldProps extends TextInputProps {
    disabled?: boolean;
    error?: string;
    touched?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

function InputField({
        disabled = false,
        error,
        touched,
        ...props
    }:InputFieldProps) {

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
                touched && Boolean(error) && styles.inputError,
                ]}>
        {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
            <TextInput
                editable={!disabled}
                placeholderTextColor={colors.PRIMARY_DARK}
                style={styles.input}
                // 자동 대문자 방지
                autoCapitalize="none"
                spellCheck={false}
                autoCorrect={false}
                {...props}
            />
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        padding: deviceHeight > 700 ? 15 : 10,
    },
    input: {
        fontSize: 16,
        color: colors.BLACK,
        padding: 0,
    },
    disabled: {
        backgroundColor: colors.BLACK,
    },
    inputError: {
        borderColor: colors.ERROR,
    },
    error: {
        color: colors.ERROR,
        fontSize: 12,
        marginBottom: 5,
    },
});

export default InputField;