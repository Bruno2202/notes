import { theme } from "@/theme";
import { Text, View, StyleSheet } from "react-native";
import SettingsOptions from "@/src/components/SettingsOptions";
import { Image } from "expo-image";
import FeedPostsFooter from "@/src/components/FooterCredits";

export default function Settings() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Configurações
            </Text>
            <SettingsOptions />
            <View style={styles.credits}>
                <Image
                    style={styles.cat}
                    source={require('../../../assets/images/cat.png')}
                />
                <FeedPostsFooter />
            </View>
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
    cat: {
        opacity: 0.6,
        height: 120,
        width: 120,
    },
    credits: {
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
        width: '100%',
    }
});
