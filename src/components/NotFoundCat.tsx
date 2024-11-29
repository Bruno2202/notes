import { theme } from "@/theme";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";

interface NotFoundCatProps {
    text?: string;
    subtext?: string;
}

export default function NotFoundCat({ text, subtext }: NotFoundCatProps) {
    return (
        <Animated.View
            entering={FadeIn}
            layout={LinearTransition}
            style={styles.container}
        >
            <View
                style={{...styles.container, opacity: 0.6}}
            >
                <Image
                    source={require('../../assets/images/cat.png')}
                    style={styles.notFoundCat}
                />
                <Text style={styles.text}>
                    {text}
                </Text>
                <Text style={{ ...styles.text, fontSize: 12 }}>
                    {subtext}
                </Text>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        top: 80,
        flex: 1,
    },
    text: {
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorGrey,

        textAlign: 'center',
    },
    notFoundCat: {
        width: 160,
        height: 160,
    }
});
