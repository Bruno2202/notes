import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { theme } from "@/theme";
import { NoteContext } from "@/src/contexts/NoteContext";
import { UserContext } from "@/src/contexts/UserContext";
import { MaterialIcons } from "@expo/vector-icons";
import { MarkerModel } from "../core/models/MarkerModel";
import { MarkerController } from "../core/controllers/MarkerController";
import Input from "@/src/components/Input";
import Separator from "@/src/components/Separator";
import NotFoundCat from "@/src/components/NotFoundCat";

interface FlatListTypes {
    item: MarkerModel;
    index: number;
}

export default function Marker() {
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [marker, setMarker] = useState<MarkerModel | null>(null);
    const [newMarker, setNewMarker] = useState<string>('');

    const { userData } = useContext(UserContext) ?? { userData: null };
    const { markers, setMarkers } = useContext(NoteContext) ?? {
        markers: [],
        setMarkers: () => { },
    };

    async function handleDeleteMarker(marker: MarkerModel) {
        await MarkerController.deleteMarker(marker.getId!);
        const markers = await MarkerController.fetchMarkers(userData!);
        setMarkers(markers);
    }

    function handleFocus(item: MarkerModel) {
        setFocusedIndex(item.getId!);
        setMarker(item)
    };

    function handleDescriptionChange(index: number, text: string) {
        if (markers) {
            const updatedMarkers: MarkerModel[] = [...markers];
            updatedMarkers[index].setDescription = text;
            setMarkers(updatedMarkers);
        }
    };

    async function handleCreateMarker() {
        await MarkerController.createMarker(userData!, newMarker);
        const markers = await MarkerController.fetchMarkers(userData!);
        setMarkers(markers);
        setNewMarker('');
    };

    function handleBlur() {
        setFocusedIndex(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Marcadores
            </Text>
            <View style={styles.addMarkerContainer}>
                <View style={styles.markerInput}>
                    <Input
                        placeholder="Marcador"
                        icon="label"
                        value={newMarker}
                        onChangeText={(text: string) => setNewMarker(text)}
                    />
                </View>
                <TouchableOpacity style={styles.addButton} activeOpacity={0.6} onPress={() => handleCreateMarker()}>
                    <MaterialIcons name="add" size={24} color={theme.colorWhite} />
                </TouchableOpacity>
            </View>

            <Separator marginVertical={32} />

            {markers.length > 0 ? (
                <FlatList
                    data={markers}
                    keyExtractor={(item) => item.getId!.toString()}
                    renderItem={({ item, index }: FlatListTypes) => {
                        if (item) {
                            const isFocused = focusedIndex === index;

                            return (
                                <View style={styles.markersContainer}>
                                    <View style={styles.markerInput}>
                                        <Input
                                            placeholder="Marcador"
                                            value={item.getDescription}
                                            icon="label"
                                            onFocus={() => handleFocus(item)}
                                            onBlur={handleBlur}
                                            onChangeText={(text: string) => handleDescriptionChange(index, text)}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        style={[
                                            styles.removeButton,
                                        ]}
                                        activeOpacity={0.6}
                                        onPress={() => handleDeleteMarker(item)}
                                    >
                                        <MaterialIcons name="remove" size={24} color={theme.colorWhite} />
                                    </TouchableOpacity>
                                </View>
                            );
                        } else {
                            return null;
                        }
                    }}
                    contentContainerStyle={{ paddingBottom: 120 }}
                />
            ) : (
                <NotFoundCat 
                    text="Pra que marcadores, não é mesmo?"
                    subtext="(Você não possui marcadores)"
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
        marginBottom: 40,
    },
    addMarkerContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    markerInput: {
        width: '80%',
    },
    addButton: {
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colorBlue,
    },
    markersContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    removeButton: {
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colorRed,
    },
});