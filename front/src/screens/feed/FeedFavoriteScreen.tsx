import FeedFavoriteList from '@/components/feed/FeedFavoriteList';
import { SafeAreaView, StyleSheet } from 'react-native';

function FeedFavoriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <FeedFavoriteList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default FeedFavoriteScreen;
