import { theme } from '@/theme';
import { PropsWithChildren, useContext, useEffect } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { FadeIn, FadeOut } from 'react-native-reanimated';

type Props = {
    onPress?: () => void;
};

export default function OpacityOverlay({ onPress }: Props) {
    return (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.overlayContainer}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.modalBackground} />
            </TouchableWithoutFeedback>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    overlayContainer: {
        zIndex: 1,
        height: "100%",
        width: "100%",
        position: 'absolute',
    },
    modalBackground: {
        flex: 1,
        opacity: 0.4,
        backgroundColor: theme.colorDarkBlack,
    },
});