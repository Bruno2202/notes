import { theme } from "@/theme";
import { StyleSheet, Text, View } from "react-native";
import Checkbox from 'expo-checkbox';
import { useContext, useState } from "react";
import { FlatList } from "react-native";
import { NoteContext } from "@/src/contexts/NoteContext";
import { MarkerModel } from "../core/models/MarkerModel";

interface FlatListTypes {
    item: MarkerModel;
}

export default function MarkerModal() {

    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

    const { markers, setMarkers } = useContext(NoteContext) ?? {
        markers: null,
        setMarkers: () => { },
    };

    const toggleCheckbox = (id: string) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Marcadores
            </Text>
            <FlatList
                data={markers}
                keyExtractor={(item) => item.getId!.toString()}
                renderItem={({ item }: FlatListTypes) => {
                    const itemId = item.getId!.toString();
                    const isChecked = !!checkedItems[itemId];

                    return (
                        <View style={styles.checkboxContainer}>
                            <Checkbox
                                style={styles.checkbox}
                                value={isChecked}
                                onValueChange={() => toggleCheckbox(itemId)}
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