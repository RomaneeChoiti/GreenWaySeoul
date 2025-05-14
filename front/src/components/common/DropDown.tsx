import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type DropDownProps = {
    title: string;
    data: { title: string; subTitle: string }[];
};

function DropDown({ title, data }: DropDownProps) {
    const [isVisible, setIsVisible] = useState(false);
    const heightAnim = useRef(new Animated.Value(0)).current;

    const toggleDropDown = () => {
        if (isVisible) {
            Animated.timing(heightAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setIsVisible(false));
        } else {
            setIsVisible(true);
            Animated.timing(heightAnim, {
                toValue: data.length * 60,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    return (
        <View>
            <Pressable onPress={toggleDropDown} style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
                <Ionicons
                    name={isVisible ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="gray"
                />
            </Pressable>
            <Animated.View style={[styles.container, { height: heightAnim }]}>
                {isVisible &&
                    data.map((item, index) => (
                        <View key={index} style={styles.item}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemSubTitle}>{item.subTitle}</Text>
                        </View>
                    ))}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#9c9c9c',
    },
    headerText: {
        fontSize: 16,
    },
    container: {
        overflow: 'hidden',
        paddingLeft: 20,
    },
    item: {
        paddingVertical: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    itemSubTitle: {
        fontSize: 14,
        marginTop: 5,
        color: '#666',
    },
});

export default DropDown;
