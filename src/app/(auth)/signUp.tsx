import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";

import { theme } from "@/theme";
import { UserModel } from "../core/models/UserModel";
import { UserService } from "../core/services/UserService";

import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import Button from "../../components/Button";

export default function SignUp() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassowrd] = useState<string>('');

    async function nextStep() {
        Keyboard.dismiss();

        if (!name || !email || !password || !confPassword) {
            Toast.show({
                type: 'error',
                text1: 'Cadastro incompleto',
                text2: 'Preencha todos os campos antes de prosseguir'
            });
        } else if (password != confPassword) {
            Toast.show({
                type: 'error',
                text1: 'As senhas não coincidem',
                text2: 'Por favor, verifique e tente novamente.'
            });
        } else {
            const user = new UserModel(name, email, password);

            try {
                const isValid = await UserService.validateFields(user);

                if (isValid) {
                    router.push({
                        pathname: '/(auth)/userPic',
                        params: { name, email, password }
                    });
                }
            } catch (error: any) {
                Toast.show({
                    type: 'error',
                    text1: error.message,
                });
            }
        }
    }

    const keyboard = useAnimatedKeyboard({ isStatusBarTranslucentAndroid: true });
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: -keyboard.height.value * 0.5 }],
    }));

    return (
        <View style={{ flex: 1, backgroundColor: theme.colorBlack }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1, backgroundColor: theme.colorBlack }}>
                <Animated.View style={[styles.container, animatedStyles]}>
                    <Text style={styles.title}>
                        Cadastro
                    </Text>
                    <View style={styles.forms}>
                        <Input placeholder="Nome de usuário" icon={"person"} onChangeText={setName} maxLength={25} />
                        <Input placeholder="Email" icon={"mail-outline"} onChangeText={setEmail} />
                        <PasswordInput placeholder="Senha" onChangeText={setPassword} canView={true} />
                        <PasswordInput placeholder="Confirmar senha" onChangeText={setConfPassowrd} canView={false} />
                        <View style={styles.next}>
                            <Button onPress={nextStep} text={"AVANÇAR"} />
                            <Link style={styles.signIn} href={"/"}>
                                <Text>Já possui uma conta? </Text>
                                <Text style={styles.textFocus}>ENTRAR</Text>
                            </Link>
                        </View>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: theme.paddingHorizontal,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
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
        marginTop: 52,
        gap: 15,
        flex: 1,
        width: '100%',
    },
    next: {
        marginTop: 52,
    },
    signIn: {
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