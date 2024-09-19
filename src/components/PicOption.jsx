import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Touchable, View, TouchableOpacity } from "react-native";

import { theme } from "@/theme";

export default function PicOption() {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.6}>
                <MaterialIcons name="photo-library" size={32} color={theme.colorGrey} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}>
                <MaterialCommunityIcons name="camera-outline" size={32} color={theme.colorGrey} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '50%',
        position: "absolute",
        bottom: 200,
        left: 100,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 40,
        backgroundColor: theme.colorDarkGrey,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignSelf: 'center',
    }
});