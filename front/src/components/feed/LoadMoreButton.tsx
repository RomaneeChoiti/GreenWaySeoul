import { Pressable, Text, View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface LoadMoreButtonProps {
    hasMore: boolean;
    isLoadingMore: boolean;
    onPress: () => void;
}

function LoadMoreButton({ hasMore, isLoadingMore, onPress }: LoadMoreButtonProps) {
    const { theme } = useThemeStore();
    const styles = styling(theme);

    if (!hasMore) {
        return null;
    }

    return (
        <View style={styles.loadMoreContainer}>
            <Pressable
                style={[
                    styles.loadMoreButton,
                    isLoadingMore && styles.loadMoreButtonDisabled,
                ]}
                onPress={onPress}
                disabled={isLoadingMore}
            >
                {isLoadingMore ? (
                    <ActivityIndicator
                        size="small"
                        color={colors[theme].BLACK}
                    />
                ) : (
                    <Text style={styles.loadMoreText}>more</Text>
                )}
            </Pressable>
        </View>
    );
}

const styling = (_theme: ThemeMode) =>
    StyleSheet.create({
        loadMoreContainer: {
            position: 'absolute',
            bottom: Dimensions.get('screen').height * 0.03,
            left: 0,
            right: 0,
            alignItems: 'center',
            backgroundColor: 'transparent',
        },
        loadMoreButton: {
            paddingHorizontal: Dimensions.get('screen').width * 0.08,
            paddingVertical: Dimensions.get('screen').height * 0.015,
            backgroundColor: colors.PRIMARY,
            borderRadius: 20,
            elevation: 3, // Android 그림자
            shadowColor: '#000', // iOS 그림자
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        loadMoreButtonDisabled: {
            opacity: 0.6,
        },
        loadMoreText: {
            fontSize: 9,
            fontWeight: '700',
            color: colors[_theme].BLACK,
        },
    });

export default LoadMoreButton;
