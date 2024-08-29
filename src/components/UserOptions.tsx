import { theme } from '@/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Separator from './Separator';
import { Href, router } from 'expo-router';

export default function UserOptions() {

    const navigation = (route: Href) => {
        router.push(route);
    }

    return (
        <View style={styles.optionContainer}>
            <TouchableOpacity style={styles.option} onPress={() => console.log("OK")} activeOpacity={0.4}>
                <MaterialIcons name={"edit"} color={theme.colorBlue} size={24} />
                <Text style={styles.optionText}>Editar perfil</Text>
                <View style={styles.optionGo}>
                    <MaterialIcons name={"arrow-forward-ios"} color={theme.colorGrey} size={16} />
                </View>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity style={styles.option} onPress={() => console.log("OK")} activeOpacity={0.4}>
                <MaterialIcons name={"settings"} color={theme.colorBlue} size={24} />
                <Text style={styles.optionText}>Configurações</Text>
                <View style={styles.optionGo}>
                    <MaterialIcons name={"arrow-forward-ios"} color={theme.colorGrey} size={16} />
                </View>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity style={styles.option} onPress={() => navigation("../(auth)")} activeOpacity={0.4}>
                <MaterialIcons name={"logout"} color={theme.colorRed} size={24} />
                <Text style={styles.optionText}>Sair</Text>
                <View style={styles.optionGo}>
                    <MaterialIcons name={"arrow-forward-ios"} color={theme.colorGrey} size={16} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
});