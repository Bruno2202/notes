import { theme } from "@/theme";
import Button from "./Button";
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { LoadingContext } from "../contexts/LoadingContext";

export default function LoadingView() {
    const { loading } = useContext(LoadingContext) ?? { loading: false };

    const rotation = useSharedValue(0);

    rotation.value = withRepeat(
        withTiming(360, {
            duration: 1000,
            easing: Easing.linear,
        }),
        -1,
        false
    );

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    return (
        loading && (
            <View style={styles.container}>
                <Animated.View style={[styles.circle, animatedStyle]} />
            </View>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        backgroundColor: theme.colorDarkBlack,
        zIndex: 1,
        opacity: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        height: 48,
        width: 48,
        borderRadius: 24,
        borderBlockColor: theme.colorBlue,
        borderEndColor: theme.colorBlue,
        borderStartColor: "rgba(0, 0, 0, 0.0)",
        borderWidth: 4,
    },
});