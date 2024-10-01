import { theme } from "@/theme";
import { View, Text, StyleSheet } from "react-native"

export default function FeedPostsFooter() {
    function getYear(): number {
        const date: Date = new Date();
        return date.getFullYear();
    }

    return (
        <View style={styles.footer}>
            <Text style={styles.text}>
                © Bruno C. Terribile {getYear()}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
    },
    text: {
        color: theme.colorGrey,
        fontSize: 12,
        fontFamily: 'fontFamilySemiBold',
    },
});