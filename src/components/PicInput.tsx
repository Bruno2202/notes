import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image } from "expo-image";

import { ImageModel } from "../app/core/models/ImageModel";
import { theme } from "@/theme";

interface PicInputProps {
    onImageSelected: (uri: string | null) => void;
}

export default function PicInput({ onImageSelected }: PicInputProps) {
    const [userPic, setUserPic] = useState<string | null>(null);

    return (
        <View style={styles.container}>
            {userPic ? (
                <TouchableOpacity activeOpacity={0.6} onPress={                        
                    async () => {ImageModel.pickImage().then(image => {
                        if (image) {
                            setUserPic(image);
                            onImageSelected(image)
                        }
                    });
                }}>
                    <Image source={{ uri: `data:image/jpeg;base64,${userPic}` }} style={styles.picture} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.picture} activeOpacity={0.6} onPress={
                    async () => {ImageModel.pickImage().then(image => {
                        if (image) {  
                            setUserPic(image);
                            onImageSelected(image)
                        }
                    });
                }}>
                    <MaterialCommunityIcons name="camera-outline" size={52} color={theme.colorGrey} />
                </TouchableOpacity>
            )}
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        marginVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: theme.paddingHorizontal,
        flexDirection: 'column',
        backgroundColor: theme.colorBlack,
    },
    picture: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colorDarkGrey,
        aspectRatio: 1,
        width: '80%',
        padding: 50,
        borderRadius: 500,
    },
});
