import { theme } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useContext } from "react";
import { Pressable, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NoteContext } from "../contexts/NoteContext";
import { NoteController } from "../app/core/controllers/NoteController";
import { Href, router } from "expo-router";
import Separator from "./Separator";

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

    function openMarkerModal() {
        setNoteOptionsVisible(!noteOptionsVisible);
        navigation('/(notes)/markerModal');
    }

    const share = async () => {
        try {
            await Share.share({
                message:
                    `*${note?.getTitle}*\n${note?.getContent}`,
            });
        } catch (error: any) {
            console.log(`Erro ao compartilhar nota: ${error.message}`);
        }
    };

    return (
        noteOptionsVisible && (
            <Pressable
                style={styles.container}
                onPress={() => setNoteOptionsVisible(!noteOptionsVisible)}
            >
                <BlurView
                    experimentalBlurMethod="dimezisBlurView"
                    intensity={1}
                    style={styles.blurContainer}
                />
                <View style={styles.optionContainer}>
                    <TouchableOpacity style={styles.option} onPress={() => deleteNote(note?.getId!)}>
                        <MaterialIcons name="delete" size={20} color={theme.colorRed} />
                        <Text style={styles.text}>Excluir</Text>
                    </TouchableOpacity>
                    <Separator />
                    <TouchableOpacity style={styles.option} onPress={() => share()}>
                        <MaterialIcons name="share" size={20} color={theme.colorBlue} />
                        <Text style={styles.text}>Compartilhar</Text>
                    </TouchableOpacity>
                    <Separator />
                    <TouchableOpacity style={styles.option} onPress={() => openMarkerModal()}>
                        <MaterialIcons name="label" size={20} color={theme.colorBlue} />
                        <Text style={styles.text}>Marcadores</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
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
        backgroundColor: theme.colorDarkGrey,
        borderRadius: 8,
        position: 'absolute',
        right: 0,
        top: 20,
    },
    option: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row'
    },
    text: {
        marginLeft: 12,
        fontFamily: 'fontFamilyRegular',
        color: theme.colorWhite,
    }
});