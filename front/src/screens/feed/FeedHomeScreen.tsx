import Loader from '@/components/common/Loader';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import FeedList from '@/components/feed/FeedList';
import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { Suspense } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function FeedHomeScreen() {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  return (
    <LinearGradient
                colors={[colors[theme].GRAY_300, colors[theme].WHITE]}
                locations={[0.95, 0]}
                style={styles.gradient}
    >
    <SafeAreaView style={styles.container}>
      <RetryErrorBoundary>
        <Suspense fallback={<Loader />}>
          <FeedList />
        </Suspense>
      </RetryErrorBoundary>
    </SafeAreaView>
    </LinearGradient>
  );
}

const styling = (_theme: ThemeMode) =>
  StyleSheet.create({
  gradient:{
    flex: 1,
  },
  container:{
    flex: 1,
  },
});

export default FeedHomeScreen;
