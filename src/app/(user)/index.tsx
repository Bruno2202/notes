import { theme } from "@/theme";
import { Text, View, StyleSheet } from "react-native";

export default function Settings() {
    return(
        <View style={styles.container}>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: theme.paddingHorizontal,
        flex: 1,
        backgroundColor: theme.colorBlack,
        paddingTop: theme.statusBarHeight + 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});
