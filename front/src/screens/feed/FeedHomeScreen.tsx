import FeedList from '@/components/feed/FeedList';
import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { SafeAreaView, StyleSheet } from 'react-native';

function FeedHomeScreen() {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  return (
    <SafeAreaView style={styles.container}>
        <FeedList />
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: colors[theme].WHITE,
  },
});

export default FeedHomeScreen;
