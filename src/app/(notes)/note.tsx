import { BackHandler, StyleSheet, TextInput } from "react-native";
import { useContext, useEffect, useState } from "react";
import { theme } from "@/theme";
import { NoteContext } from "@/src/contexts/NoteContext";
import { UserContext } from "@/src/contexts/UserContext";
import { NoteModel } from "../core/models/NoteModel";
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";
import { router } from "expo-router";

export default function Note() {
    const { userData } = useContext(UserContext)!
    const { note, setNote } = useContext(NoteContext)!

    const [title, setTitle] = useState<string>(note?.getTitle ? note.getTitle : "");
    const [content, setContent] = useState<string>(note?.getContent ? note.getContent : "");

    useEffect(() => {
        if (title || content) {
            const newNote = new NoteModel(
                note?.getUserId!,
                1,
                note ? note.getCreationDate : new Date(),
                note?.getId! ? note.getId! : undefined,
                title,
                content,
            );

            setNote(newNote);
        }
    }, [userData, title, content]);

    useEffect(() => {
        const handleBackPress = () => {
            router.navigate('/(drawer)')
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, []);

    const keyboard = useAnimatedKeyboard({
        isStatusBarTranslucentAndroid: true
    });
    const animatedStyles = useAnimatedStyle(() => ({
        marginBottom: keyboard.height.value * 0.5
    }));

    return (
        <Animated.View style={[styles.container]}>
            <TextInput
                multiline
                style={styles.noteTitle}
                onChangeText={setTitle}
                placeholder="Título"
                placeholderTextColor={theme.colorMediumGrey}
                selectionColor={theme.colorBlue}
                value={title}
            />
            <TextInput
                multiline
                style={styles.noteContent}
                onChangeText={setContent}
                placeholder="Escreva aqui..."
                placeholderTextColor={theme.colorMediumGrey}
                textAlignVertical="top"
                selectionColor={theme.colorBlue}
                value={content}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingContainer: {
        flex: 1,
    },
    container: {
        paddingHorizontal: theme.paddingHorizontal,
        backgroundColor: theme.colorBlack,
        flex: 1,
        position: 'relative'
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    noteTitle: {
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorWhite,
        fontSize: 28,
    },
    noteContent: {
        fontFamily: 'fontFamilyRegular',
        marginTop: 12,
        color: theme.colorGrey,
        fontSize: 16,
        minHeight: 100,
        height: 'auto',
    },
    teste: {
        width: '100%',
        backgroundColor: theme.colorBlue,
    }
});
