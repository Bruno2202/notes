import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet } from "react-native";

export default function TabBarGradient() {
    return (
        <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
            style={styles.gradient}
            pointerEvents="none"
        />
    );
}

const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
    },
});