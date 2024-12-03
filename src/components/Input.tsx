import { TextInput, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { theme } from "@/theme";

interface InputProps {
    placeholder: string;
    icon?: any;
    onChangeText?: any;
    maxLength?: number;
    value?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    editable?: boolean
    readOnly?: boolean
    onEndEditing?: () => void;
}

export default function Input({
    placeholder,
    icon,
    onChangeText,
    maxLength,
    value,
    onFocus,
    onBlur,
    editable,
    readOnly,
    onEndEditing
}: InputProps) {
    return (
        <View style={styles.container}>
            <TextInput
                placeholderTextColor={theme.colorGrey}
                placeholder={placeholder}
                style={styles.input}
                onChangeText={onChangeText}
                maxLength={maxLength}
                value={value && value}
                onFocus={onFocus}
                onBlur={onBlur}
                editable={!editable ? editable : !editable}
                readOnly={!readOnly ? readOnly : !readOnly}
                onEndEditing={onEndEditing}
            />
            {icon &&
                <MaterialIcons
                    style={{ paddingHorizontal: 16, pointerEvents: 'none'}}
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
        backgroundColor: theme.colorDarkGrey,
    },
    input: {
        paddingVertical: 12,
        paddingLeft: 16,
        flex: 1,
        alignItems: 'center',
        width: '90%',
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorWhite
    },
});
