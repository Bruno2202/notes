import { AppInfoContext } from "@/src/contexts/AppInfoContext";
import { theme } from "@/theme";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Info() {
    const { reactNativeVersion, reactVersion } = useContext(AppInfoContext) ?? { userData: null, setUserData: () => { } };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Informações do aplicativo
            </Text>
            <Text style={styles.text}>
                Versão do React: {reactVersion}
            </Text>
            <Text style={styles.text}>
                Versão do React Native: {reactNativeVersion}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: theme.paddingHorizontal,
        flex: 1,
        backgroundColor: theme.colorBlack,
        justifyContent: 'flex-start',
    },
    title: {
        width: '100%',
        alignItems: 'flex-start',
        color: theme.colorWhite,
        fontFamily: 'fontFamilySemiBold',
        fontSize: 40,
        marginBottom: 40,
    },
    text: {
        textAlign: 'left',
        width: '100%',
        alignItems: 'flex-start',
        color: theme.colorGrey,
        fontFamily: 'fontFamilyRegular',
    },
});