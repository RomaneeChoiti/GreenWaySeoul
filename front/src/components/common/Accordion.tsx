import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Animated, LayoutChangeEvent } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type AccordionProps = {
    title: string;
    data: { title: string; subTitle: string }[];
};

function Accordion({ title, data }: AccordionProps) {
    const { theme } = useThemeStore();
    const styles = styling(theme);
    const [isVisible, setIsVisible] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;
    const [contentHeights, setContentHeights] = useState<number[]>([]);

    const toggleAccordion = () => {
        const toValue = isVisible ? 0 : 1;
        Animated.timing(animation, {
            toValue,
            duration: 400,
            useNativeDriver: false,
        }).start();
        setIsVisible(!isVisible);
    };

    const totalHeight = contentHeights.reduce((acc, height) => acc + height, 0);

    const heightInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, totalHeight],
    });

    const handleLayout = (index: number, event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setContentHeights((prevHeights) => {
            const newHeights = [...prevHeights];
            newHeights[index] = height;
            return newHeights;
        });
    };

    return (
        <View>
            <Pressable onPress={toggleAccordion} style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
                <Ionicons
                    name={isVisible ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={styles.iconColor.color}
                />
            </Pressable>
            <Animated.View style={[styles.container, { height: heightInterpolation, overflow: 'hidden' }]}>
                {data.map((item, index) => (
                    <View
                        key={index}
                        style={styles.item}
                        onLayout={(event) => handleLayout(index, event)}
                    >
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemSubTitle}>{item.subTitle}</Text>
                    </View>
                ))}
            </Animated.View>
        </View>
    );
}

const styling = (theme: ThemeMode) =>
    StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: colors[theme].WHITE,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors[theme].GRAY_700,
    },
    iconColor: {
        color: colors[theme].BLACK,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors[theme].BLACK,
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: colors[theme].WHITE,
    },
    item: {
        paddingVertical: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: colors[theme].BLACK,
    },
    itemSubTitle: {
        fontSize: 14,
        marginTop: 5,
        color: colors[theme].GRAY_500,
        lineHeight: 20,
    },
});

export default Accordion;
