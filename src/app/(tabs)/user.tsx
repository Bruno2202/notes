import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "@/theme";
import { Image } from "expo-image";
import { useContext, useEffect, useState } from "react";
import { UserModel } from "../(api)/MODEL/UserModel";
import { UserController } from "../(api)/CONTROLLER/UserController";
import { MaterialIcons } from "@expo/vector-icons";
import UserOptions from "@/src/components/UserOptions";
import { ImageModel } from "../(api)/MODEL/ImageModel";
import { UserContext } from "@/src/contexts/UserContext";

export default function User() {
    const { userData, setUserData } = useContext(UserContext) ?? { userData: null, setUserData: () => {} };

    const [newUserPic, setNewUserPic] = useState<string | null>(null);

    useEffect(() => {
        if (newUserPic && userData && newUserPic != null) {
            const newUserData = new UserModel(
                userData.getName,
                userData.getEmail,
                userData.getPassword,
                userData.getId,
                newUserPic
            );
            setNewUserPic(null);

            const updateUser = async () => {
                const updatedUser = await UserController.update(newUserData);
                setUserData(updatedUser);
            };

            updateUser();
        }
    }, [newUserPic]);

    return (
        <>
            <View style={styles.container}>
                {(userData) ? (
                    <>
                        <View style={styles.userPicContainer}>
                            {userData.getUserPic && (
                                    <Image
                                        source={{ uri: userData.getUserPic }}
                                        style={styles.userPic}
                                    />
                                )
                            }
                            <TouchableOpacity
                                onPress={async () => {
                                    ImageModel.pickImage().then(image => {
                                        setNewUserPic(image);
                                    });
                                }}
                                activeOpacity={0.4}
                            >
                                <View style={styles.editIconContainer}>
                                    <MaterialIcons name="edit" color={theme.colorWhite} size={24} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.username}>
                            {userData.getName}
                        </Text>
                        <View style={styles.emailContainer}>
                            <Text style={styles.email}>
                                {userData.getEmail}
                            </Text>
                        </View>
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
    },
    emailContainer: {
        backgroundColor: theme.colorDarkGrey,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginVertical: 40,
    },
    email: {
        fontSize: 12,
        color: theme.colorGrey,
        fontFamily: 'fontFamilyLight',
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
    }
});
