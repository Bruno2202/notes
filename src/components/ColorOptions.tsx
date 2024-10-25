import { theme } from "@/theme";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
    setColor: React.Dispatch<React.SetStateAction<string>>;
}

export default function ColorOptions({ setColor }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.a}>
                <TouchableOpacity activeOpacity={0.6} style={{ ...styles.color, backgroundColor: theme.noteColorPurple }} onPress={() => setColor(theme.noteColorPurple)} />
                <TouchableOpacity activeOpacity={0.6} style={{ ...styles.color, backgroundColor: theme.noteColorBlue }} onPress={() => setColor(theme.noteColorBlue)} />
                <TouchableOpacity activeOpacity={0.6} style={{ ...styles.color, backgroundColor: theme.noteColorGreen }} onPress={() => setColor(theme.noteColorGreen)} />
                <TouchableOpacity activeOpacity={0.6} style={{ ...styles.color, backgroundColor: theme.noteColorYellow }} onPress={() => setColor(theme.noteColorYellow)} />
                <TouchableOpacity activeOpacity={0.6} style={{ ...styles.color, backgroundColor: theme.noteColorOrange }} onPress={() => setColor(theme.noteColorOrange)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colorMediumGrey,
        gap: 12,
        bottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    a: {
        flexDirection: 'row',
        gap: 20,
        position: 'absolute',
        backgroundColor: theme.colorDarkGrey,
        padding: 12,
        borderRadius: 8,
        bottom: 20,
    },
    color: {
        borderRadius: 50,
        padding: 16,
    },
});