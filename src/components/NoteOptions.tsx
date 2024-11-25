import { theme } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useContext, useEffect } from "react";
import { Pressable, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NoteContext } from "../contexts/NoteContext";
import { NoteController } from "../app/core/controllers/NoteController";
import { Href, router } from "expo-router";
import Separator from "./Separator";
import { UserContext } from "../contexts/UserContext";
import Animated, { FadeIn, FadeOut, RollInLeft, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming, ZoomInEasyDown, ZoomInEasyUp, ZoomInRight, ZoomInUp, ZoomOutDown, ZoomOutEasyUp, ZoomOutRight, ZoomOutUp } from "react-native-reanimated";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import OpacityOverlay from "./OpacityOverlay";

export default function NoteOptions() {
    const { token } = useContext(UserContext)!
    const { userData } = useContext(UserContext)!
    const { noteOptionsVisible, setNoteOptionsVisible, note, setNote } = useContext(NoteContext)!

    function navigation(route: Href) {
        router.navigate(route);
    }

    async function deleteNote(id: string) {
        await NoteController.deleteNote(token!, id);
        setNote(null);
        setNoteOptionsVisible(false);
        navigation('/(tabs)');
    }

    function openMarkerModal() {
        setNoteOptionsVisible(!noteOptionsVisible);
        navigation('/(notes)/markerModal');
    }

    function openShareModal() {
        setNoteOptionsVisible(!noteOptionsVisible);
        navigation('/(notes)/shareModal');
    }

    async function handleUnshareNote() {
        await NoteController.unshareNote(note?.getId!, userData?.getId!, token!);
        setNote(null);
        setNoteOptionsVisible(false);
        navigation('/(tabs)');
    }

    async function share() {
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
            <>
                <Pressable
                    style={styles.container}
                    onPress={() => setNoteOptionsVisible(false)}
                >
                    <Animated.View entering={ZoomInEasyUp.duration(100)} exiting={ZoomOutEasyUp.duration(100).springify()} style={styles.optionContainer}>
                        {note?.getUserId == userData?.getId ? (
                            <>
                                <TouchableOpacity style={styles.option} onPress={() => deleteNote(note?.getId!)}>
                                    <MaterialIcons name="delete" size={20} color={theme.colorRed} />
                                    <Text style={styles.text}>Excluir</Text>
                                </TouchableOpacity>
                                <Separator />
                                <TouchableOpacity style={styles.option} onPress={() => share()}>
                                    <MaterialIcons name="share" size={20} color={theme.colorGrey} />
                                    <Text style={styles.text}>Compartilhar</Text>
                                </TouchableOpacity>
                                <Separator />
                                <TouchableOpacity style={styles.option} onPress={() => openMarkerModal()}>
                                    <MaterialIcons name="label" size={20} color={theme.colorGrey} />
                                    <Text style={styles.text}>Marcadores</Text>
                                </TouchableOpacity>
                                <Separator />
                                <TouchableOpacity style={styles.option} onPress={() => openShareModal()}>
                                    <MaterialIcons name="group-add" size={20} color={theme.colorGrey} />
                                    <Text style={styles.text}>Nota compartilhada</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity style={styles.option} onPress={() => handleUnshareNote()}>
                                <MaterialIcons name="group-remove" size={20} color={theme.colorRed} />
                                <Text style={styles.text}>Descompartilhar nota</Text>
                            </TouchableOpacity>
                        )}
                    </Animated.View>
                </Pressable>
                <OpacityOverlay onPress={() => setNoteOptionsVisible(false)} />
            </>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        zIndex: 2,
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