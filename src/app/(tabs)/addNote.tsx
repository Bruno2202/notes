import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from "@/theme";

import NotesTypes from "@/src/components/NotesTypes";

export default function Types() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Tipos
                {"\n"}de Nota
            </Text>
            <View style={styles.typesContainer}>
                <NotesTypes />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        flex: 1,
        backgroundColor: theme.colorBlack,
		paddingHorizontal: theme.paddingHorizontal,
    },
    title: {
		color: theme.colorWhite,
		fontFamily: 'fontFamilySemiBold',
		fontSize: 40,
    },
    typesContainer: {
        marginTop: 40,
    }
});