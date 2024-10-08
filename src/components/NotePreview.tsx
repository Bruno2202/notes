import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { theme } from "@/theme";
import { Href, router } from "expo-router";
import { NoteContext } from "../contexts/NoteContext";
import { useContext } from "react";
import { NoteModel } from "../app/core/models/NoteModel";

interface PropTypes {
    noteData: NoteModel;
}

export default function NotePreview({ noteData }: PropTypes) {
    const { setNote } = useContext(NoteContext) ?? {
        setNote: () => { }
    };

    function navigation(route: Href) {
        router.navigate(route);
    }

    function selectNote() {
        setNote(noteData);
        navigation("/(notes)/note");
    }

    function handleNoteCreationDate(timestamp: Date): string {
        const now = new Date();
        const createdDate = new Date(timestamp);
        const diffInMillis = now.getTime() - createdDate.getTime();

        const diffInMinutes = Math.floor(diffInMillis / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);

        if (diffInMillis < 24 * 60 * 60 * 1000) {
            if (diffInHours > 0) {
                return `Há ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
            }
            return `Há ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
        }

        const day = String(createdDate.getDate()).padStart(2, '0');
        const month = String(createdDate.getMonth() + 1).padStart(2, '0');
        const year = createdDate.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={() => selectNote()}>
            <View style={styles.container}>
                {noteData.getTitle &&
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                        {noteData.getTitle}
                    </Text> 
                }
                {noteData.getContent &&
                    <Text style={noteData.getTitle ? {...styles.content, marginTop: 4} : {...styles.content}} numberOfLines={5} ellipsizeMode="tail">
                        {noteData.getContent} 
                    </Text> 
                }
                <Text style={styles.date}>
                    {handleNoteCreationDate(noteData.getCreationDate)}
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
        fontSize: 20,
        lineHeight: 24,
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorWhite,
    },
    content: { 
        fontSize: 14,
        fontFamily: 'fontFamilyRegular',
        color: theme.colorGrey,
    },
    date: {
        textAlign: 'right',
        marginTop: 8,
        fontSize: 10,
        fontFamily: 'fontFamilyRegular',
        color: theme.colorGrey,
    }
});
