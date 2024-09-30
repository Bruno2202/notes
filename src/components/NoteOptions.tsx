import { theme } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NoteContext } from "../contexts/NoteContext";
import { NoteController } from "../app/core/controllers/NoteController";
import { Href, router } from "expo-router";

export default function NoteOptions() {
    const { 
        noteOptionsVisible, 
        setNoteOptionsVisible, 
        note,
        setNote
    } = useContext(NoteContext) ?? { 
        noteOptionsVisible: false, 
        setNoteOptionsVisible: () => { },
        note: null,
        setNote: () => { }
    };

    async function deleteNote(id: number) {
        await NoteController.deleteNote(id);
        setNote(null);
        setNoteOptionsVisible(false);
        navigation('/(tabs)');
    }

    function navigation(route: Href) {
		router.navigate(route);
	}

    return (
        noteOptionsVisible && (
            <>
                <Pressable
                    style={styles.container}
                    onPress={() => setNoteOptionsVisible(!noteOptionsVisible)}
                >
                    <BlurView
                        experimentalBlurMethod="dimezisBlurView"
                        intensity={1}
                        style={styles.blurContainer}
                    />
                </Pressable>
                <SafeAreaView style={styles.optionContainer}>
                    <TouchableOpacity style={styles.option} onPress={() => deleteNote(note?.getId!)}>
                        <MaterialIcons name="delete" size={20} color={theme.colorRed} />
                        <Text style={styles.text}>Excluir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        <MaterialIcons name="share" size={20} color={theme.colorBlue} />
                        <Text style={styles.text}>Compartilhar</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    blurContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    optionContainer: {
        margin: 12,
        gap: 20,
        backgroundColor: theme.colorDarkGrey,
        borderRadius: 8,
        paddingHorizontal: 20,
        padding: 12,
        position: 'absolute',
        right: 0,
    },
    option: {
        flexDirection: 'row'
    },
    text: {
        marginLeft: 8,
        fontFamily: 'fontFamilyRegular',
        color: theme.colorWhite,
    }
});