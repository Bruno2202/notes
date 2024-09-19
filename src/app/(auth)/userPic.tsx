import { Text, View, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { UserService } from "../core/services/UserService";
import { UserModel } from "../core/models/UserModel";
import { ImageModel } from "../core/models/ImageModel";
import { theme } from "@/theme";

import Button from "../../components/Button";
import PicInput from "@/src/components/PicInput";

export default function UserPic() { 
    const [userPic, setUserPic] = useState<string | null>(null);
    const { name, email, password } = useLocalSearchParams();

    const nameStr = Array.isArray(name) ? name[0] : name;
    const emailStr = Array.isArray(email) ? email[0] : email;
    const passwordStr = Array.isArray(password) ? password[0] : password;

    async function createUser(): Promise<void> {
        const user = new UserModel(
            nameStr,
            emailStr,
            passwordStr,
            undefined,
            userPic ? userPic : null
        );

        if (await UserService.register(user)) {
            router.navigate('/');
            console.log("Usuário criado")
        }
    }
 
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Foto de usuário
            </Text>
            <PicInput onImageSelected={setUserPic} />
            <View style={styles.next}>
                <Button onPress={createUser} text={"CADASTRAR"} />
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
    next: {
        marginTop: 40,
    }
});