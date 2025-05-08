import { colors } from "@/constants";
import { ImageUri } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
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
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Octicons from "react-native-vector-icons/Octicons";

interface ImageCarouselProps {
    images: ImageUri[];
    pressedIndex?: number;
}

const deviceWidth = Dimensions.get('window').width;

function ImageCarousel({images, pressedIndex = 0}: ImageCarouselProps) {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [initialIndex, setInitialIndex] = useState(pressedIndex);
    const [page, setPage] = useState(pressedIndex);
    const handleScrool = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
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
                    source={{
                        uri: `${
                            Platform.OS === 'ios'
                            ? 'http://localhost:3030'
                            : 'http://10.0.2.2:3030'
                        }/${item.uri}`,
                    }}/>
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
        onScroll={handleScrool}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    backButton:{
        position: 'absolute',
        zIndex: 1,
        left: 20,
        backgroundColor: colors.WHITE,
        padding: 10,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.BLACK,
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
        backgroundColor: 'lightgray',
        borderRadius: 5,
        marginHorizontal: 3,
    },
    activeDot:{
        backgroundColor: colors.PRIMARY,
    }
});

export default ImageCarousel;