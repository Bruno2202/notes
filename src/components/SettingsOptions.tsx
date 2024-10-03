import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity, Text, Switch, Linking } from 'react-native';

import { theme } from '@/theme';

import Separator from './Separator';
import { LinearGradient } from 'expo-linear-gradient';
import { Href, router } from 'expo-router';

interface OptionsTypes {
    description: string;
    iconName: any;
    iconType: string;
    colorBackgroundGradient: string[];
    onPress: () => void;
    showSwitch: boolean;
}

const navigation = (route: Href) => {
    router.push(route);
}

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
                {showSwitch ? (
                    <Switch
                        style={{margin: 0}}
                        trackColor={{false: theme.colorGrey, true: theme.colorGreen}}
                        thumbColor={theme.colorWhite}
                        ios_backgroundColor="#3e3e3e"
                        value={true}
                    />
                ) : (
                    <MaterialIcons name={"arrow-forward-ios"} color={theme.colorGrey} size={16} />
                )}
            </View>
        </TouchableOpacity>
    );
}

export default function SettingsOptions() {
    return (
        <View style={styles.container}>
            <Option
                description="Modo escuro"
                iconType="MaterialIcons"
                iconName="dark-mode"
                colorBackgroundGradient={['#1A94F7', '#1A38D3']}
                onPress={() => console.log("")}
                showSwitch={false}
            />
            <Separator />
            <Option
                description="Código fonte"
                iconType="MaterialCommunityIcons"
                iconName="github"
                colorBackgroundGradient={['#242F40', '#0D1117']}
                onPress={() => Linking.openURL("https://github.com/Bruno2202/notes")}
                showSwitch={false}
            />
            <Separator />
            <Option
                description="Infomações do  aplicativo"
                iconType="MaterialCommunityIcons"
                iconName="information"
                colorBackgroundGradient={['#1A94F7', '#1A38D3']}
                onPress={() => navigation('/info')}
                showSwitch={false}
            />
            <Separator />
            <Option
                description="Excluir perfil"
                iconType="MaterialCommunityIcons"
                iconName="delete-forever"
                colorBackgroundGradient={['#BF3C3C', '#662020']}
                onPress={() => console.log("")}
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