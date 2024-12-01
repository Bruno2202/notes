import { BackHandler, Keyboard, StyleSheet, TextInput, View, ScrollView } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { theme } from "@/theme";
import { NoteContext } from "@/src/contexts/NoteContext";
import { UserContext } from "@/src/contexts/UserContext";
import { NoteModel } from "../core/models/NoteModel";
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";
import { router, useFocusEffect } from "expo-router";

export default function Note() {
    const { userData } = useContext(UserContext)!
    const { note, setNote } = useContext(NoteContext)!

    const [title, setTitle] = useState<string>(note?.getTitle ? note.getTitle : "");
    const [content, setContent] = useState<string>(note?.getContent ? note.getContent : "");

    useEffect(() => {
        if (title || content) {
            const newNote = new NoteModel(
                note?.getUserId!,
                1,  // Tipo da nota (1: texto)
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

    useFocusEffect(
        useCallback(() => {
            Keyboard.dismiss();
        }, [])
    );

    const keyboard = useAnimatedKeyboard({
        isStatusBarTranslucentAndroid: true
    });
    const keyboardStyles = useAnimatedStyle(() => ({
        width: '100%',
        marginBottom: keyboard.height.value
    }));

    return (
        <View style={styles.container}>
            <Animated.View style={styles.inputsContainer}>
                <TextInput
                    textAlignVertical="top"
                    autoCapitalize="none"
                    multiline
                    style={styles.noteTitle}
                    onChangeText={setTitle}
                    placeholder="Título"
                    placeholderTextColor={theme.colorMediumGrey}
                    selectionColor={theme.colorBlue}
                    value={title}
                />
                <ScrollView keyboardShouldPersistTaps="handled">
                    <TextInput
                        textAlignVertical="top"
                        autoCapitalize="none"
                        multiline
                        style={styles.noteContent}
                        onChangeText={setContent}
                        placeholder="Escreva aqui..."
                        placeholderTextColor={theme.colorMediumGrey}
                        selectionColor={theme.colorBlue}
                        value={content}
                    />
                </ScrollView>
            </Animated.View>
            <Animated.View style={[keyboardStyles]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colorBlack,
        flex: 1,
    },
    inputsContainer: {
        backgroundColor: theme.colorBlack,
        paddingHorizontal: theme.paddingHorizontal,
        flex: 1,
        position: 'relative',
        paddingBottom: 20,
    },
    contentContainer: {
        flex: 1
    },
    noteTitle: {
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorWhite,
        fontSize: 28,
    },
    noteContent: {
        flex: 1,
        fontFamily: 'fontFamilyRegular',
        marginTop: 12,
        color: theme.colorGrey,
        fontSize: 16,
        minHeight: 100,
        height: 'auto',
        textAlignVertical: 'top'
    },
});
