import { router } from 'expo-router';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import { AuthService } from '../app/core/services/AuthService';
import { theme } from '@/theme';

import Separator from './Separator';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import { NoteContext } from '../contexts/NoteContext';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimationContext } from '../contexts/AnimationContext';

interface OptionsTypes {
    description: string;
    iconName: any;
    iconType: string;
    colorBackgroundGradient: string[];
    onPress: () => void;
    showSwitch: boolean;
}

export default function UserOptions() {

    const { setUserData } = useContext(UserContext) ?? { setUserData: () => { } };
    const { setNotes } = useContext(NoteContext) ?? { setNotes: () => { } };
    const { setWelcomeIsVisible } = useContext(AnimationContext)!

    function Option({ description, iconName, iconType, colorBackgroundGradient, onPress, showSwitch }: OptionsTypes) {
        return (
            <TouchableOpacity
                style={styles.optionContainer}
                onPress={onPress}
                activeOpacity={0.4}
            >
                <LinearGradient
                    style={styles.optionIconBackground}
                    colors={colorBackgroundGradient}
                >
                    {iconType == 'MaterialIcons' ?
                        <MaterialIcons name={iconName} color={theme.colorWhite} size={24} />
                        : iconType == 'MaterialCommunityIcons' &&
                        <MaterialCommunityIcons name={iconName} color={theme.colorWhite} size={24} />
                    }
                </LinearGradient>
                <Text style={styles.optionText}>{description}</Text>
                <View style={styles.optionGo}>
                    <MaterialIcons name={"arrow-forward-ios"} color={theme.colorGrey} size={16} />
                </View>
            </TouchableOpacity>
        );
    }
    

    return (
        <View style={styles.container}>
            <Option
                description="Configurações"
                iconType="MaterialIcons"
                iconName="settings"
                colorBackgroundGradient={['#1A94F7', '#1A38D3']}
                onPress={() => router.push('/(settings)')}
                showSwitch={false}
            />
            <Separator />
            {/* <Option
                description="Editar perfil"
                iconType="MaterialIcons"
                iconName="edit"
                colorBackgroundGradient={['#1A94F7', '#1A38D3']}
                onPress={() => console.log()}
                showSwitch={false}
            /> */}
            {/* <Separator /> */}
            <Option
                description="Sair"
                iconType="MaterialIcons"
                iconName="logout"
                colorBackgroundGradient={['#BF3C3C', '#662020']}
                onPress={async () => {
                    await AuthService.logout();
                    setUserData(null);
                    setNotes([]);
                    setWelcomeIsVisible(true);
                }}
                showSwitch={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: theme.colorDarkGrey,
        borderRadius: 8,
    },
    optionContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        flexDirection: 'row',
    },
    optionIconBackground: {
        padding: 4,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
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