import { View, StyleSheet, TextInput } from "react-native";
import { useContext, useEffect, useState } from "react";
import { theme } from "@/theme";
import { NoteContext } from "@/src/contexts/NoteContext";
import { NoteModel } from "../core/models/NoteModel";
import { UserContext } from "@/src/contexts/UserContext";

export default function CreateNote() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [noteId, setNoteId] = useState<number | undefined>(undefined);

    const { userData } = useContext(UserContext) ?? { userData: null };
    const { note, setNote } = useContext(NoteContext) ?? {
        note: null,
        setNote: () => { }
    };

    useEffect(() => {
        if (note?.getId) {
            setNoteId(note.getId!);
            setTitle(note.getTitle ? note.getTitle : "");
            setContent(note.getContent ? note.getContent : "");
        }
    }, [note]);

    useEffect(() => {
        const newNote = new NoteModel(
            userData?.getId!,
            1,
            note ? note.getCreationDate : new Date(),
            noteId ? noteId : undefined,
            title,
            content,
        );

        setNote(newNote);
    }, [userData, title, content]);

    return (
        <View style={styles.container}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    container: {
        paddingHorizontal: theme.paddingHorizontal,
        backgroundColor: theme.colorBlack,
        height: '100%',
    },
    icons: {
    },
    noteTitle: {
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorWhite,
        fontSize: 28,
    },
    noteContent: {
        fontFamily: 'fontFamilyRegular',
        height: '100%',
        marginTop: 12,
        color: theme.colorGrey,
        fontSize: 16,
    },
});