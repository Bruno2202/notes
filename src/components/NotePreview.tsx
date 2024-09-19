import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { theme } from "@/theme";
import { Href, router } from "expo-router";
import { NoteContext } from "../contexts/NoteContext";
import { useContext } from "react";
import { NoteModel } from "../app/core/models/NoteModel";

interface PropTypes {
    noteData: NoteModel;
    title?: string | "";
    content?: string | "";
}

export default function NotePreview({ noteData }: PropTypes) {
    const { note, setNote } = useContext(NoteContext) ?? {
        note: null,
        setNote: () => { }
    };

	function navigation(route: Href) {
		router.navigate(route);
	}

    function selectNote() {
        setNote(noteData);
        navigation("/(notes)/note");
    }
    
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={() => selectNote()}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {noteData.getTitle}
                </Text>
                <Text style={styles.content}>
                    {noteData.getContent}
                </Text>
            </View>
        </TouchableOpacity>
    );
} 

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        width: '100%',
        backgroundColor: theme.colorDarkGrey,
        borderRadius: 8,
        padding: 8,
    },
    title: {
        lineHeight: 16,
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorWhite,
        marginBottom: 8,
    },
    content: {
        fontFamily: 'fontFamilyRegular',
        color: theme.colorGrey,
    }
});