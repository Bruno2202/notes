import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useContext, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { theme } from "@/theme";
import { UserModel } from "../../core/models/UserModel";
import { ImageModel } from "../../core/models/ImageModel";
import { UserContext } from "@/src/contexts/UserContext";
import { UserService } from "../../core/services/UserService";
import { LinearGradient } from "expo-linear-gradient";
import { NoteContext } from "@/src/contexts/NoteContext";
import UserCards from "@/src/components/UserCards";
import UserOptions from "@/src/components/UserOptions";

export default function User() {
    const { userData, setUserData, token } = useContext(UserContext) ?? { userData: null, setUserData: () => { }, token: undefined };
    const { notesCounter } = useContext(NoteContext)!

    const [newUserPic, setNewUserPic] = useState<string | null>(null);

    useEffect(() => {
        if (newUserPic && userData) {
            const newUserData = new UserModel(
                userData.getName,
                userData.getEmail,
                userData.getPassword,
                userData.getCreationDate,
                userData.getId,
                newUserPic
            );

            const updateUser = async () => {
                try {
                    const updatedUser = await UserService.update(newUserData, token!);
                    setUserData(updatedUser);
                } catch (error) {
                    console.error("Erro ao atualizar o usuário:", error);
                }
            };

            setNewUserPic(null);
            updateUser();
        }
    }, [newUserPic]);

    return (
        <>
            <View style={styles.container}>
                {(userData) ? (
                    <>
                        <View style={styles.userPicContainer}>
                            {(typeof (userData.getUserPic) === "string") ? (
                                <Image
                                    source={{ uri: userData.getUserPic }}
                                    style={styles.userPic}
                                />
                            ) : (
                                <Image
                                    source={require('../../../../assets/images/userPic.png')}
                                    style={styles.userPic}
                                />
                            )}
                            <TouchableOpacity
                                onPress={async () => {
                                    ImageModel.pickImage().then(image => {
                                        setNewUserPic(image);
                                    });
                                }}
                                activeOpacity={0.4}
                            >
                                <LinearGradient
                                    colors={['#1A94F7', '#1A38D3']}
                                    style={styles.editIconContainer}>
                                    <MaterialIcons name="edit" color={theme.colorWhite} size={24} />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.username}>
                            {userData.getName}
                        </Text>
                        <UserCards
                            description={`Total de notas : ${notesCounter}`}
                        />
                        <UserCards
                            description={userData.getEmail}
                        />
                        <UserOptions />
                    </>
                ) : (
                    <>
                    </>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: theme.paddingHorizontal,
        flex: 1,
        backgroundColor: theme.colorBlack,
        paddingTop: theme.statusBarHeight + 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    userPicContainer: {
        position: 'relative',
        width: '40%',
        aspectRatio: 1,
        margin: 16,
    },
    userPic: {
        width: '100%',
        height: '100%',
        borderRadius: 200,
    },
    editIconContainer: {
        position: 'absolute',
        right: -4,
        bottom: -4,
        backgroundColor: theme.colorBlue,
        borderRadius: 100,
        padding: 4,
    },
    username: {
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorWhite,
        fontSize: 24,
        marginBottom: 20,
    },
    optionContainer: {
        width: '100%',
        backgroundColor: theme.colorDarkGrey,
        borderRadius: 8,
    },
    option: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignItems: 'center',
        flexDirection: 'row',
    },
    optionText: {
        marginLeft: 16,
        fontFamily: 'fontFamilyRegular',
        color: theme.colorGrey,
    },
    optionGo: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    separator: {
        width: '100%',
        borderBottomColor: theme.colorGrey,
        borderBottomWidth: 1.6,
        opacity: 0.1,
    },
});
