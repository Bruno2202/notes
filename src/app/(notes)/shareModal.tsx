import { theme } from "@/theme";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserModel } from "../core/models/UserModel";
import { FlatList } from "react-native";
import NotFoundCat from "@/src/components/NotFoundCat";
import { Image } from "expo-image";
import { UserController } from "../core/controllers/UserController";
import { UserContext } from "@/src/contexts/UserContext";
import { NoteController } from "../core/controllers/NoteController";
import { NoteContext } from "@/src/contexts/NoteContext";

export default function ShareModal() {
    const [users, setUsers] = useState<UserModel[]>([]);

    const { userData, token } = useContext(UserContext)!;
    const { note } = useContext(NoteContext)!

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        const res = await UserController.fetchNotes(token!);
        setUsers(res);
    }

    async function handleShareNote(sharedWith: string) {
        await NoteController.shareNote(userData?.getId!, sharedWith, note?.getId!, new Date(), token!);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Usuários</Text>
            {users.length > 0 ? (
                <FlatList
                    data={users.filter((user) => user.getId !== userData?.getId!)}
                    keyExtractor={(item) => item.getId!}
                    renderItem={({ item }: { item: UserModel }) => (
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => handleShareNote(item.getId!)}
                        >
                            <View style={styles.userContainer}>
                                <Image
                                    source={item.getUserPic
                                        ? { uri: item.getUserPic }
                                        : require('../../../assets/images/userPic.png')}
                                    style={styles.userImage}
                                />
                                <Text style={styles.userName}>{item.getName}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ paddingBottom: 120 }}
                />
            ) : (
                <NotFoundCat
                    text="Aqui está meio quieto por enquanto"
                    subtext="(Sem usuários para compartilhar)"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colorBlack,
        paddingHorizontal: theme.paddingHorizontal,
    },
    title: {
        color: theme.colorWhite,
        fontFamily: 'fontFamilySemiBold',
        fontSize: 40,
        marginBottom: 40,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: theme.colorDarkGrey,
        padding: 8,
        borderRadius: 8
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    userName: {
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorWhite,
        fontSize: 18,
    },
});
