import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './CustomButton';

type FallbackProps = {
    resetErrorBoundary: () => void;
}

function FallbackComponent({resetErrorBoundary}: FallbackProps) {
    const { theme } = useThemeStore();
    const styles = styling(theme);

    return (
    <View style={styles.container}>
        <Text style={styles.titleText}>잠시 후 다시 시도해주세요.</Text>
        <Text style={styles.descriptionText}>요청 사항을 처리하는데 실패했습니다.</Text>
        <CustomButton
            label="다시 시도"
            size="medium"
            onPress={resetErrorBoundary}
        />
    </View>);
}

const fallbackRender = ({ resetErrorBoundary }: FallbackProps) => (
    <FallbackComponent resetErrorBoundary={resetErrorBoundary} />
);

function RetryErrorBoundary({ children }: PropsWithChildren) {
    const { reset } = useQueryErrorResetBoundary();

    return (
        <ErrorBoundary
            onReset={reset}
            fallbackRender={fallbackRender}
        >
            {children}
        </ErrorBoundary>
    );
}


const styling = (theme: ThemeMode) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors[theme].WHITE,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors[theme].BLACK,
        marginBottom: 20,
    },
    descriptionText:{
        fontSize: 16,
        color: colors[theme].GRAY_700,
        marginBottom: 30,
    },
});

export default RetryErrorBoundary;
