import { View, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { theme } from "@/theme";

export default function SearchBar() {
    return (
        <View style={styles.container}>
            <MaterialIcons 
                name={"search"} 
                size={24} 
                color={theme.colorGrey}                
            />
            <TextInput 
                placeholder="Lista de compras"
                placeholderTextColor={theme.colorGrey}
                style={styles.input} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: theme.colorDarkGrey,
    },
    input: {
        flex: 1,
        alignItems: 'center',
        width: '90%',
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorWhite,
        marginLeft: 12,
    },
});
