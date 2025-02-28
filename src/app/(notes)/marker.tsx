import { View, StyleSheet, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput } from "react-native";
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
import Animated, { FadeInLeft, FadeOutLeft, FadeOutUp, LinearTransition } from "react-native-reanimated";
import Toast from "react-native-toast-message";

interface FlatListTypes {
    item: MarkerModel;
    index: number;
}

export default function Marker() {
    const [newMarker, setNewMarker] = useState<string>('');
    const [selectedMarker, setSelectedMarker] = useState<string>('');

    const { userData, token } = useContext(UserContext)!
    const { markers, setMarkers } = useContext(NoteContext)!

    async function handleDeleteMarker(marker: MarkerModel) {
        await MarkerController.deleteMarker(token!, marker.getId!);
        const markers = await MarkerController.fetchMarkers(token!, userData!);
        setMarkers(markers);
    }

    async function handleUpdateMarker(marker: MarkerModel) {
        if (selectedMarker !== marker.getDescription) {
            if (marker.getDescription !== "") {
                await MarkerController.updateMarker(token!, marker);
                const markers = await MarkerController.fetchMarkers(token!, userData!);
                setMarkers(markers);
            }
        }
    }

    async function handleCreateMarker() {
        await MarkerController.createMarker(token!, userData!, newMarker);
        const markers = await MarkerController.fetchMarkers(token!, userData!);
        setMarkers(markers);
        setNewMarker('');
    };

    function handleDescriptionChange(index: number, text: string) {
        if (text !== "") {
            if (markers) {
                const updatedMarkers: MarkerModel[] = [...markers];
                updatedMarkers[index].setDescription = text;
                setMarkers(updatedMarkers);
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Marcador sem conteudo',
                text2: 'Não é possível criar marcador sem conteúdo',
                visibilityTime: 3000,
            });
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
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
                    <Animated.FlatList
                        layout={LinearTransition}
                        itemLayoutAnimation={LinearTransition}
                        data={markers}
                        keyExtractor={(item) => item.getId!.toString()}
                        renderItem={({ item, index }: FlatListTypes) => {
                            if (item) {
                                return (
                                    <Animated.View
                                        entering={FadeInLeft}
                                        exiting={FadeOutLeft}
                                        style={styles.markerContainer}
                                    >
                                        <View style={styles.markerInput}>
                                            <Input
                                                placeholder="Marcador"
                                                value={item.getDescription}
                                                icon="label"
                                                onFocus={() => setSelectedMarker(item.getDescription)}
                                                onChangeText={(text: string) => handleDescriptionChange(index, text)}
                                                onEndEditing={() => handleUpdateMarker(item)}
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
                                    </Animated.View>
                                );
                            } else {
                                return null;
                            }
                        }}
                        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: theme.paddingHorizontal, gap: 20 }}
                    />
                ) : (
                    <NotFoundCat
                        text="Pra que marcadores, não é mesmo?"
                        subtext="(Você não possui marcadores)"
                    />
                )}

            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colorBlack,
    },
    title: {
        paddingHorizontal: theme.paddingHorizontal,
        color: theme.colorWhite,
        fontFamily: 'fontFamilySemiBold',
        fontSize: 40,
        marginBottom: 40,
    },
    addMarkerContainer: {
        paddingHorizontal: theme.paddingHorizontal,
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
    markerContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    removeButton: {
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colorRed,
    },
});