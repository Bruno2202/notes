import { Text, View, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";

import { UserModel } from "../core/models/UserModel";
import { theme } from "@/theme";
import { LoadingContext } from "@/src/contexts/LoadingContext";
import { AuthController } from "../core/controllers/AuthControllers";

import Button from "../../components/Button";
import PicInput from "@/src/components/PicInput";


export default function UserPic() {
    const [userPic, setUserPic] = useState<string | null>(null);

    const { name, email, password } = useLocalSearchParams();
    const { setLoading } = useContext(LoadingContext)!

    const nameStr = Array.isArray(name) ? name[0] : name;
    const emailStr = Array.isArray(email) ? email[0] : email;
    const passwordStr = Array.isArray(password) ? password[0] : password;

    async function createUser(): Promise<void> {
        setLoading(true);

        const user = new UserModel(
            nameStr,
            emailStr,
            passwordStr,
            new Date(),
            undefined,
            userPic ? userPic : null
        );

        const res = await AuthController.register(user)
        setLoading(false);

        if (res.success) {
            router.navigate('/');
        }
    }

    return (
        <>
            {/* <LoadingView /> */}
            <View style={styles.container}>
                <Text style={styles.title}>
                    Foto de usuário
                </Text>
                <PicInput onImageSelected={setUserPic} />
                <View style={styles.next}>
                    <Button onPress={createUser} text={"CADASTRAR"} />
                </View>
            </View>
        </>
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