import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";

export default function CreateNote() {

    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");

    return (
        <View style={styles.createNote}>
            <TextInput
                style={styles.noteTitle}
                multiline={true}
                onChangeText={setNoteTitle}
                placeholder="Note title"
            >
            </TextInput>
            <TextInput
                style={styles.noteContent}
                multiline={true}
                onChangeText={setNoteContent}
                placeholder="Note content"
            >
            </TextInput>
        </View >
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    createNote: {
        padding: 8,
        marginTop: 24,
        height: '100%',
    },
    icons: {
    },
    noteTitle: {
        color: 'black',
        margin: 0,
        fontSize: 50,
    },
    noteContent: {
        margin: 0,
        fontSize: 16,
    },
});