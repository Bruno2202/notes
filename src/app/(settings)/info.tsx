import { theme } from "@/theme";
import { StyleSheet, Text, View } from "react-native";

export default function Info() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Informações do aplicativo
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: theme.paddingHorizontal,
        flex: 1,
        backgroundColor: theme.colorBlack,
        justifyContent: 'flex-start',
    },
    text: {
        textAlign: 'center',
        width: '100%',
        alignItems: 'flex-start',
        color: theme.colorGrey,
        fontFamily: 'fontFamilyRegular',
        marginBottom: 40,
    },
});