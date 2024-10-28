import { theme } from "@/theme";
import { StyleSheet, Text, View } from "react-native";
import Checkbox from 'expo-checkbox';
import { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { NoteContext } from "@/src/contexts/NoteContext";
import { MarkerModel } from "../core/models/MarkerModel";
import { MarkerController } from "../core/controllers/MarkerController";
import Button from "@/src/components/Button";
import NotesMarkersController from "../core/controllers/NotesMarkersController";
import NotFoundCat from "@/src/components/NotFoundCat";
import { UserContext } from "@/src/contexts/UserContext";

interface FlatListTypes {
    item: MarkerModel;
}

export default function MarkerModal() {
    const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
    const [noteMarkers, setNoteMarkers] = useState<MarkerModel[]>([]);

    const { note, markers } = useContext(NoteContext) ?? { note: null, markers: [] }
    const { token } = useContext(UserContext) ?? { token: undefined }

    useEffect(() => {
        fetchNoteMarkers(note?.getId!);
    }, []);

    useEffect(() => {
        loadCheckedMarkers();
    }, [markers, noteMarkers]);

    function loadCheckedMarkers() {
        if (markers && noteMarkers) {
            const updatedCheckedItems: { [key: string]: boolean } = {};

            for (let i = 0; i < markers.length; i++) {
                const markerId: number | undefined = markers[i].getId;
                const foundMarker: MarkerModel | undefined = noteMarkers.find(marker => marker.getId == markerId);

                if (foundMarker) {
                    updatedCheckedItems[markerId!] = true;
                } else {
                    updatedCheckedItems[markerId!] = false;
                }
            }

            setCheckedItems(updatedCheckedItems);
        }
    }

    async function fetchNoteMarkers(noteId: number) {
        const markers = await MarkerController.fetchNoteMarkers(token!, noteId);
        setNoteMarkers(markers);
    }

    async function handleMark(marked: boolean, noteId: number, markerId: number) {
        if (marked) {
            NotesMarkersController.createNoteMarker(noteId, markerId);
            return;
        } else {
            NotesMarkersController.deleteNoteMarker(noteId, markerId);
        }
    }

    const toggleCheckbox = (id: number) => {
        setCheckedItems(prevState => {
            const updatedState = { ...prevState, [id]: !prevState[id] };
            handleMark(updatedState[id], note?.getId!, id);
            return updatedState;
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Marcadores
            </Text>
            {markers.length > 0 ? (
                <FlatList
                    data={markers}
                    keyExtractor={(item) => item.getId!.toString()}
                    renderItem={({ item }: FlatListTypes) => {
                        const itemId = item.getId!;
                        const isChecked = !!checkedItems[itemId];

                        return (
                            <View style={styles.checkboxContainer}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={isChecked}
                                    onValueChange={() => toggleCheckbox(Number(itemId))}
                                    color={isChecked ? theme.colorBlue : theme.colorGrey}
                                />
                                <Text style={styles.text}>
                                    {item.getDescription}
                                </Text>
                            </View>
                        );
                    }}
                    contentContainerStyle={{ paddingBottom: 120 }}
                />
            ) : (
                <NotFoundCat 
                    text="Parece que alguém está precisando de marcadores..."
                    subtext="(Crie um marcador para utilizá-lo na nota)"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colorBlack,
        paddingHorizontal: theme.paddingHorizontal,
    },
    title: {
        color: theme.colorWhite,
        fontFamily: 'fontFamilySemiBold',
        fontSize: 40,
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    checkbox: {
        marginRight: 12,
    },
    text: {
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorGrey,
    }
});