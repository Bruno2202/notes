import { Text, View, StyleSheet } from "react-native";
import { Href, router } from "expo-router";

import { theme } from "@/theme";

import Button from "../../components/Button";
import Input from "../../components/Input";

export default function UserPic() {

    const navigation = (route: Href) => {
        router.navigate(route);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Esqueceu {"\n"}
                a senha?
            </Text>
            <Text style={styles.text}>
                Não se preocupe! Isso acontece com todos. {"\n"}
                Por favor, insira o seu e-mail abaixo e enviaremos um link para você redefinir sua senha.
            </Text>
            <View style={styles.forms}>
                <Input placeholder="Email" icon={"mail-outline"} />
                <Button onPress={() => navigation('/')} text={"ENVIAR EMAIL"} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: theme.paddingHorizontal,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.colorBlack,
    },
    title: {
        marginTop: 52,
        textAlign: 'left',
        fontFamily: 'fontFamilyBold',
        fontSize: 40,
        color: theme.colorWhite
    },
    forms: {
        height: '50%',
        gap: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginTop: 28,
        color: theme.colorWhite,
        fontFamily: 'fontFamilyLight',
        fontSize: 16,
    },
});