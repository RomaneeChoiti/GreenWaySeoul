import React, { ForwardedRef, forwardRef, ReactNode, useRef } from 'react';
import { Dimensions, StyleSheet, TextInput, View, TextInputProps, Pressable, Text } from 'react-native';
import { colors } from '@/constants';
import { mergeRefs } from '@/utils';

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
                    placeholderTextColor={colors.PRIMARY_DARK}
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
        backgroundColor: 'gray',
    },
    inputError: {
        borderColor: colors.ERROR,
    },
    error: {
        color: colors.ERROR,
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
