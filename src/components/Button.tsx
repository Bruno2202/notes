import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "@/theme";

interface InputProps {
    text: string;
    onPress?: () => void;   // Pode ou não receber função (?)
}

export default function Button({ text, onPress }: InputProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.6}>
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: theme.colorBlue,
    },
    text: {
        textAlign: 'center',
        fontFamily: 'fontFamilyBold',
        color: theme.colorWhite
    },
});
