import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "@/theme";
import { useState } from "react";

interface InputTypes {
    placeholder: string;
    onChangeText?: any;
    canView: boolean;
}

export default function PasswordInput({ placeholder, onChangeText, canView }: InputTypes) {
    const [visible, setVisible] = useState(true);

    return (
        <View style={styles.container}>
            <TextInput
                placeholderTextColor={theme.colorGrey}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={visible}
                onChangeText={onChangeText}
            />
            {canView ? (
                <Pressable onPress={() => { setVisible(!visible) }}>
                    <MaterialIcons
                        name={visible ? "visibility" : "visibility-off" }
                        size={24}
                        color={theme.colorGrey}
                    />
                </Pressable>
            ) : (
                <MaterialIcons
                    name={'lock'}
                    size={24}
                    color={theme.colorGrey}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: theme.colorDarkGrey,
    },
    input: {
        flex: 1,
        alignItems: 'center',
        width: '90%',
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorWhite
    },
});
