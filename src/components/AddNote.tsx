import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { theme } from "@/theme";

interface AddNoteProps {
    onPress: () => void
}

export default function AddNote({ onPress }: AddNoteProps) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={onPress}>
            <MaterialIcons name="add" color={theme.colorWhite} size={28} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 24,
        bottom: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: 56,
        height: 56,
        padding: 12,
        backgroundColor: theme.colorBlue,
        borderRadius: 8,
    },
});