import { theme } from "@/theme";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Separator from "./Separator";
import { Href, router } from "expo-router";

export default function NotesTypes() {

    function navigation(route: Href) {
        router.replace(route);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.6} style={styles.typeButton} onPress={() => navigation('/note')}>
                <MaterialIcons name="text-snippet" size={24} color={theme.colorGrey} />
                <Text style={styles.text}>
                    Nota
                </Text>
                <View style={styles.arrowContainer}>
                    <MaterialIcons name={"arrow-forward-ios"} color={theme.colorGrey} size={16} />
                </View>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity activeOpacity={0.6} style={styles.typeButton}>
                <MaterialIcons name="checklist" size={24} color={theme.colorGrey} />
                <Text style={styles.text}>
                    Lista
                </Text>
                <View style={styles.arrowContainer}>
                    <MaterialIcons name={"arrow-forward-ios"} color={theme.colorGrey} size={16} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: theme.colorDarkGrey,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    typeButton: {
        paddingVertical: 12,
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        marginLeft: 8,
        fontFamily: 'fontFamilySemiBold',
        fontSize: 20,
        color: theme.colorWhite,
    },
    arrowContainer: {
        flex: 1,
        alignItems: 'flex-end',
    }
});