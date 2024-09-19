import { View, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { theme } from "@/theme";

interface InputProps {
    placeholder: string;
    icon?: any;
    onChangeText?: any;
    maxLength?: number
}

export default function Input({ placeholder, icon, onChangeText, maxLength }: InputProps) {
    return (
        <View style={styles.container}>
            <TextInput 
                placeholderTextColor={theme.colorGrey}
                placeholder={placeholder} 
                style={styles.input} 
                onChangeText={onChangeText}
                maxLength={maxLength}
            />
            {icon && 
                <MaterialIcons 
                    name={icon} 
                    size={24} 
                    color={theme.colorGrey}                
                />
            }
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
