import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { Href, Link, router } from "expo-router";
import { useContext, useState } from "react";
import Toast from "react-native-toast-message";

import { AuthService } from "../core/services/AuthService";
import { TokenService } from "../core/services/TokenService";
import { UserModel } from "../core/models/UserModel";
import { theme } from "@/theme";

import PasswordInput from "../../components/PasswordInput";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { UserContext } from "@/src/contexts/UserContext";

export default function SignIn() {
    const { token, setToken } = useContext(UserContext) ?? { token: null, setToken: () => { } };

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const loginToast = () => {
        Toast.show({
            type: 'error',
            text1: 'Não foi possível fazer login',
            text2: 'Verifique suas credenciais'
        });
    }

    const navigation = (route: Href) => {
        router.replace(route); 
    }

    async function handleLogin() {
        try {
            const result = await AuthService.login(email, password);

            if (result) {
                const token = await TokenService.createToken(result)

                if (token) {
                    await TokenService.storeToken(token);
                    setToken(token);

                    navigation('/(tabs)/'); 
                }
            } else {
                loginToast();
            }
        } catch (error: any) {
            console.log(`Erro ao fazer login: ${error.message}`);
        }
    }
 
    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode="cover"
                source={require("../../../assets/images/rectangle.png")}
                style={styles.imgBackground}
            >
                <Text style={styles.title}>
                    Notes
                </Text>
            </ImageBackground>
            <View style={styles.forms}>
                <Input placeholder="Email" icon={"mail-outline"} onChangeText={setEmail} />
                <PasswordInput placeholder="Senha" onChangeText={setPassword} canView={true} />
                <Link style={styles.forget} href={"./forgot"}>
                    Esqueci a senha
                </Link>
                <Button text={"ENTRAR"} onPress={handleLogin} />
                <Link style={styles.singUp} href={"./signUp"}>
                    <Text>Não possui uma conta? </Text>
                    <Text style={styles.textFocus}>CADASTRE-SE</Text>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.colorBlack,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    title: {
        fontFamily: 'fontFamilyBold',
        fontSize: 40,
        color: theme.colorWhite
    },
    forms: {
        paddingHorizontal: theme.paddingHorizontal,
        gap: 15,
        flex: 1,
        width: '100%',
    },
    forget: {
        marginBottom: 48,
        textAlign: 'left',
        color: theme.colorGrey,
        fontFamily: 'fontFamilyLight',
        fontSize: 12,
        textDecorationLine: "underline"
    },
    singUp: {
        marginTop: 52,
        textAlign: 'center',
        color: theme.colorGrey,
        fontFamily: 'fontFamilyLight',
        fontSize: 12,
    },
    textFocus: {
        color: theme.colorWhite,
        fontFamily: 'fontFamilySemiBold',
        fontSize: 12,
        textDecorationLine: "underline"
    }
});