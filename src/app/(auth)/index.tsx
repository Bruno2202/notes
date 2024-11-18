import { Text, View, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Href, Link, router } from "expo-router";
import { useContext, useState } from "react";
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";

import { TokenService } from "../core/services/TokenService";
import { theme } from "@/theme";
import { UserContext } from "@/src/contexts/UserContext";
import { LoadingContext } from "@/src/contexts/LoadingContext";
import { AuthController } from "../core/controllers/AuthControllers";

import PasswordInput from "../../components/PasswordInput";
import Button from "../../components/Button";
import Input from "../../components/Input";
import LoadingView from "@/src/components/LoadingView";


export default function SignIn() {
    const { setToken } = useContext(UserContext) ?? { setToken: () => { } };
    const { setLoading } = useContext(LoadingContext) ?? { setLoading: () => { } };

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const keyboard = useAnimatedKeyboard({ isStatusBarTranslucentAndroid: true });
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: -keyboard.height.value * 0.5 }],
    }));

    const navigation = (route: Href) => {
        router.replace(route);
    }

    async function handleLogin() {
        Keyboard.dismiss();
        setLoading(true);

        const res = await AuthController.login(email, password);
        setLoading(false);

        if (res.success) {
            await TokenService.storeToken(res.token!);
            setToken(res.token);

            navigation('/(tabs)/');
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.colorBlack }}>
            <LoadingView />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Animated.View style={[styles.container, animatedStyles]}>
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
                </Animated.View>
            </TouchableWithoutFeedback>
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