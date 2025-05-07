import { PropsWithChildren, ReactNode } from 'react';
import {
    Modal,
    ModalProps,
    Pressable,
    PressableProps,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface OptionMainProps extends ModalProps{
    children: ReactNode;
    isVisible: boolean;
    animateType?: ModalProps['animationType'];
    hideOption: () => void;
}

function OptionMain({
    isVisible,
    animateType = 'slide',
    hideOption,
    children,
    ...props
}:OptionMainProps){

    return(
        <Modal
            visible={isVisible}
            transparent={true}
            animationType={animateType}
            onRequestClose={hideOption}
            {...props}
            >
            <Pressable
                style={styles.optionBackground}
                onPress={hideOption}
            >
                <SafeAreaView style={styles.safeArea}>
                    {children}
                </SafeAreaView>
            </Pressable>
        </Modal>
    );
}

function Container({children}: PropsWithChildren){
    return(
        <View  style={styles.optionContainer}>
            {children}
        </View>
    );
}

interface ButtonProps extends PressableProps{
    children: ReactNode;
    isDanger?: boolean;
}

function Button({children, isDanger = false, ...props}: ButtonProps){
    return(
        <Pressable
            style={({pressed}) => [
                pressed && styles.optionButtonPressed,
                styles.optionButton,
            ]}
            {...props}>
            <Text
                style={[
                    styles.optionText,
                    isDanger && styles.DangerText,
                ]}
                >
                {children}
            </Text>
        </Pressable>
    );
}

function Title({children}: PropsWithChildren){
    return(
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{children}</Text>
        </View>
    );
}

function Divider(){
    return (
        <View style={styles.border} />
    );
}

export const CompoundOption = Object.assign(OptionMain, {
    Container,
    Button,
    Title,
    Divider,
});

const styles = StyleSheet.create({
    optionBackground:{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    safeArea: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    optionContainer:{
        borderRadius: 15,
        marginHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    optionButton:{
        flexDirection: 'row',
        padding: 10,
        height: 50,
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionButtonPressed:{
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    optionText:{
        fontSize: 18,
        fontWeight: 500,
        color: 'green',
    },
    DangerText:{
        color: 'red',
    },
    titleContainer:{
        alignItems: 'center',
        padding: 15,
    },
    titleText:{
        fontSize: 15,
        fontWeight: 500,
        color: 'black',
    },
    border:{
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
});
