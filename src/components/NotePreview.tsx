import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { theme } from "@/theme";
import { Href, router } from "expo-router";
import { NoteContext } from "../contexts/NoteContext";
import { useContext } from "react";
import { NoteModel } from "../app/core/models/NoteModel";
import { MarkerModel } from "../app/core/models/MarkerModel";
import { UserContext } from "../contexts/UserContext";
import { MaterialIcons } from "@expo/vector-icons";

interface PropTypes {
    noteData: NoteModel;
}

interface NoteMarkersPropTypes {
    markers: MarkerModel[];
    ownerId: string;
}

function NoteMarkers({ markers, ownerId }: NoteMarkersPropTypes) {
    const { userData } = useContext(UserContext)!;

    return (
        <View style={styles.markersContainer}>
            {ownerId !== userData?.getId && (
                <View style={{ ...styles.markerContainer, marginRight: 8, backgroundColor: theme.colorGreen }}>
                    <MaterialIcons name="people-alt" size={24} color={theme.colorLightGreen} />
                </View>
            )}
            {markers.map((marker) => {
                return (
                    <View key={marker.getId} style={styles.markerContainer}>
                        <Text style={styles.markerText}>
                            {marker.getDescription}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
}

export default function NotePreview({ noteData }: PropTypes) {
    const { setNote } = useContext(NoteContext) ?? {
        setNote: () => { }
    };

    function navigation(route: Href) {
        router.push(route);
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
                    <Text style={noteData.getTitle ? { ...styles.content, marginTop: 4 } : { ...styles.content }} numberOfLines={5} ellipsizeMode="tail">
                        {noteData.getContent}
                    </Text>
                }
                <NoteMarkers
                    markers={noteData.getMarkers!}
                    ownerId={noteData.getUserId!}
                />
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
        position: 'relative'
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
    },
    markersContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 8,
        marginTop: 20,
        flexWrap: 'wrap',
    },
    markerContainer: {
        width: 'auto',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: theme.colorMediumGrey,
        fontFamily: 'fontFamilyRegular'
    },
    markerText: {
        fontFamily: 'fontFamilyRegular',
        color: theme.colorGrey
    }
});
