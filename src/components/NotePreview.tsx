import { theme } from "@/theme";
import { StyleSheet, Text, View } from "react-native";

export default function NotePreview({}) {
    return (
        <View style={styles.container}>
            <Text>
                Título
            </Text>
            <Text>
                Título
            </Text>
            <Text>
                Título
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        width: '100%',
        backgroundColor: theme.colorDarkGrey,
        borderRadius: 8,
        padding: 8,
    },
});