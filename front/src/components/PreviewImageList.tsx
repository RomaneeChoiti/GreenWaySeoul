import { Image, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ImageUri } from '@/types';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';

interface PreviewImageListProps {
    imageUris: ImageUri[];
    onDelete?: (uri: string) => void;
}

function PreviewImageList({ imageUris, onDelete }: PreviewImageListProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                    {imageUris.map(({ uri }, index) => {
                    return (
                        <Pressable style={styles.wrapper}>
                            <Image
                            key={index}
                            resizeMode = "cover"
                            source={{
                                uri: `${
                                    Platform.OS === 'ios'
                                    ? 'http://localhost:3030'
                                    : 'http://10.0.2.2:3030'
                                }/${uri}`,
                            }}
                            style={styles.image}
                            />
                            <Pressable
                                style={[styles.imageButton, styles.deleteButton]}
                                onPress={() => onDelete?.(uri)}>
                                <Ionicon name="close" size={16} color={colors.ERROR}/>
                            </Pressable>
                        </Pressable>
                    );
                    })}
                </View>
                </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        flexDirection: 'row',
    },
    wrapper: {
        width: 70,
        height: 70,
    },
    image:{
        width: '100%',
        height: '100%',
    },
    imageButton: {
        position: 'absolute',
        backgroundColor: colors.WHITE,
        zIndex: 1,
    },
    deleteButton: {
        top: 0,
        right: 0,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
});


export default PreviewImageList;