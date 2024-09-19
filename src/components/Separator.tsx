import { StyleSheet, View } from "react-native";

import { theme } from "@/theme";

export default function Separator() {
    return <View style={styles.separator}></View>;
}

const styles = StyleSheet.create({
    separator: {
        width: '100%',
        borderBottomColor: theme.colorGrey,
        borderBottomWidth: 1.6,
        opacity: 0.1,
    }
});
