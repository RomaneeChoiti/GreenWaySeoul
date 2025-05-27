import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ImageUri, ThemeMode } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    Pressable,
    StyleSheet,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';

interface ImageCarouselProps {
    images: ImageUri[];
    pressedIndex?: number;
}

const deviceWidth = Dimensions.get('window').width;

function ImageCarousel({images, pressedIndex = 0}: ImageCarouselProps) {
    const { theme } = useThemeStore();
    const styles = styling(theme);
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [initialIndex, setInitialIndex] = useState(pressedIndex);
    const [page, setPage] = useState(pressedIndex);
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / deviceWidth);
        setPage(index);
    };

  return (
    <View style={styles.container}>
        <Pressable
            style={[styles.backButton, {marginTop: insets.top + 10}]}
            onPress={() => {navigation.goBack();}}
            >
            <Octicons name="arrow-left" size={25} color={colors.PRIMARY} />
        </Pressable>
    <FlatList
        data={images}
        renderItem={({ item }) => (
            <View style={{ width: deviceWidth}}>
                <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={{ uri: item.uri}}
                />
            </View>
        )}
        keyExtractor={item => String(item.id)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        onScrollToIndexFailed={()=>{
            setInitialIndex(0);
        }}
        onScroll={handleScroll}
        getItemLayout={(_, index) => ({
            length: deviceWidth,
            offset: deviceWidth * index,
            index,
        })}
        />
        <View style={[styles.dotContainer, {bottom: insets.bottom + 15}]}>
            {Array.from({length: images.length}, (_, index) => (
                    <View
                        key={index}
                        style={[styles.dotPage, index === page && styles.activeDot]}
                    />
            ))}
        </View>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
    StyleSheet.create({
        container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors[theme].WHITE,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    backButton:{
        position: 'absolute',
        zIndex: 1,
        left: 20,
        backgroundColor: colors[theme].WHITE,
        padding: 10,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors[theme].BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    dotContainer:{
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
    },
    dotPage:{
        width: 10,
        height: 10,
        backgroundColor: colors[theme].GRAY_500,
        borderRadius: 5,
        marginHorizontal: 3,
    },
    activeDot:{
        backgroundColor: colors.PRIMARY,
    },
});

export default ImageCarousel;