import { colors } from '@/constants';
import { PropsWithChildren } from 'react';
import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, View } from 'react-native';

function Loader({
    children,
    size = 'small',
    color = colors.light.GRAY_500,
    ...props
}: PropsWithChildren<ActivityIndicatorProps>){
    return(
        <View style={style.container}>
            <ActivityIndicator
                size={size}
                color={color}
                style={style.indicator}
                {...props}
            />
            {children}
        </View>
    );
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    indicator:{
        marginBottom: 20,
    },
});

export default Loader;
