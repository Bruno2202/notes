import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme";

interface Props {
    description: string;
}

export default function UserCards({ description }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {description}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colorDarkGrey,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 20
    },
    text: {
        fontSize: 12,
        color: theme.colorGrey,
        fontFamily: 'fontFamilyLight',
    },
});