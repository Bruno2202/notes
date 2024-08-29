import { Text, View, StyleSheet } from "react-native";
import { theme } from "@/theme";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import Button from "../../components/Button";
import { Link, router } from "expo-router";
import { useState } from "react";
import { UserModel } from "../(api)/MODEL/UserModel";
import { UserController } from "../(api)/CONTROLLER/UserController";
import Toast from "react-native-toast-message";

import { useDrizzleStudio } from "expo-drizzle-studio-plugin"; // Dev tool
import * as SQLite from "expo-sqlite"; // Dev tool
const db = SQLite.openDatabaseSync("notes");// Dev tool

export default function SignUp() {

    useDrizzleStudio(db); // Dev tool

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassowrd] = useState<string>('');

    async function nextStep() {
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

            if (await UserController.validateFields(user)) {
                router.push({
                    pathname: '/signUp/userPic',
                    params: { name, email, password }
                });
            };
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Cadastro
            </Text>
            <View style={styles.forms}>
                <Input placeholder="Nome de usuário" icon={"person"} onChangeText={setName} maxLength={25} />
                <Input placeholder="Email" icon={"mail-outline"} onChangeText={setEmail} />
                <PasswordInput placeholder="Senha" onChangeText={setPassword} />
                <PasswordInput placeholder="Confirmar senha" onChangeText={setConfPassowrd} />
                <View style={styles.next}>
                    <Button onPress={nextStep} text={"AVANÇAR"} />
                    <Link style={styles.signIn} href={"/"}>
                        <Text>Já possui uma conta? </Text>
                        <Text style={styles.textFocus}>ENTRAR</Text>
                    </Link>
                </View>
            </View>
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