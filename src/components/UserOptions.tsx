import { Href, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import { AuthService } from '../app/core/services/AuthService';
import { theme } from '@/theme';

import Separator from './Separator';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

export default function UserOptions() {

    const { setUserData } = useContext(UserContext) ?? { setUserData: () => { } };

    const navigation = (route: Href) => {
        router.push(route);
    }

    function timeTest(timeString: Date) { 
        const time = new Date(timeString);

        const dia = time.getDate()
        const diaSemana = time.getDay()
        const mes = time.getMonth()
        const ano = time.getFullYear() 
        const dataFormatada = time.toLocaleDateString()
        const horaFormatada = time.toLocaleTimeString()
        const hora = time.getHours()
        const minutos = time.getMinutes()
        const segundos = time.getSeconds()


        console.log(timeString, time, dia, diaSemana, mes, ano, dataFormatada, horaFormatada, hora, minutos, segundos)
        
        // const utcDate = new Date(Date.UTC(ano, mes, dia, 23, 37, 47, 895));
        // console.log(utcDate.toISOString()); // "2024-09-30T23:37:47.895Z"
    }


    return (
        <View style={styles.optionContainer}>
            <TouchableOpacity style={styles.option} onPress={() => timeTest(new Date())} activeOpacity={0.4}>
                <MaterialIcons name={"edit"} color={theme.colorBlue} size={24} />
                <Text style={styles.optionText}>Editar perfil</Text>
                <View style={styles.optionGo}>
                    <MaterialIcons name={"arrow-forward-ios"} color={theme.colorGrey} size={16} />
                </View>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity style={styles.option} onPress={() => router.push('../(user)')} activeOpacity={0.4}>
                <MaterialIcons name={"settings"} color={theme.colorBlue} size={24} />
                <Text style={styles.optionText}>Configurações</Text>
                <View style={styles.optionGo}>
                    <MaterialIcons name={"arrow-forward-ios"} color={theme.colorGrey} size={16} />
                </View>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity
                style={styles.option}
                onPress={async () => {
                    await AuthService.logout();
                    setUserData(null);
                }}
                activeOpacity={0.4}
            >
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