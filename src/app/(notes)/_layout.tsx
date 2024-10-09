import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, BackHandler } from "react-native";

import { theme } from "@/theme";
import { Image } from "expo-image";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import NoteOptions from "@/src/components/NoteOptions";
import NoteProvider, { NoteContext } from "@/src/contexts/NoteContext";
import { useContext, useEffect } from "react";

export default function Layout() {

    const router = useRouter();

    const handleBackPress = () => {
        router.replace('/(tabs)');
        return true;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            backHandler.remove();
        };
    }, []);

    return (
        <View style={{ backgroundColor: theme.colorBlack, flex: 1 }}>
            <Stack>
                <Stack.Screen
                    name="note"
                    options={{
                        statusBarColor: theme.colorBlack,
                        headerShown: true,
                        title: '',
                        headerTintColor: theme.colorWhite,
                        headerShadowVisible: false,
                        headerStyle: {
                            backgroundColor: theme.colorBlack,
                        },
                        headerTitleAlign: 'center',
                        headerBackVisible: false,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => handleBackPress()}>
                                <MaterialIcons color={theme.colorWhite} size={22.5} name="arrow-back" />
                            </TouchableOpacity>
                        ),
                        headerTitle: () => (
                            <TouchableOpacity>
                                <MaterialIcons color={theme.colorWhite} size={28} name="color-lens" />
                            </TouchableOpacity>
                        ),
                        headerRight: () => {
                            const { noteOptionsVisible, setNoteOptionsVisible } = useContext(NoteContext) ?? { noteOptionsVisible: false, setNoteOptionsVisible: () => { } };

                            return (
                                <TouchableOpacity onPress={() => setNoteOptionsVisible(!noteOptionsVisible)}>
                                    <MaterialCommunityIcons color={theme.colorWhite} size={28} name="dots-horizontal" />
                                </TouchableOpacity>
                            );
                        }
                    }}
                />
                <Stack.Screen
                    name="marker"
                    options={{
                        statusBarColor: theme.colorBlack,
                        headerShown: true,
                        title: '',
                        headerTintColor: theme.colorWhite,
                        headerShadowVisible: false,
                        headerStyle: {
                            backgroundColor: theme.colorBlack,
                        },
                        headerTitleAlign: 'center',
                    }}
                />
                <Stack.Screen

                    name="markerModal"
                    options={{
                        presentation: 'modal',
                        statusBarColor: theme.colorBlack,
                        headerTintColor: theme.colorWhite,
                        title: '',
                        headerStyle: {
                            backgroundColor: theme.colorBlack,
                        },
                        headerShadowVisible: false,
                        headerTitleAlign: 'center',
                    }}
                />
            </Stack>
            <NoteOptions />
        </View>
    );
}