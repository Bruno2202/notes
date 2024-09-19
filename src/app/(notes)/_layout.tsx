import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";

import { theme } from "@/theme";
import { Image } from "expo-image";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import NoteOptions from "@/src/components/NoteOptions";
import NoteProvider, { NoteContext } from "@/src/contexts/NoteContext";
import { useContext, useEffect } from "react";

export default function Layout() {
    return (
        <View style={{ backgroundColor: theme.colorBlack, flex: 1 }}>
            <StatusBar backgroundColor={theme.colorBlack} />
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        statusBarTranslucent: true,
                        headerShown: true,
                        title: '',
                        headerTintColor: theme.colorWhite,
                        headerShadowVisible: false,
                        headerStyle: {
                            backgroundColor: theme.colorBlack,
                        }
                    }}
                />
                <Stack.Screen
                    name="note"
                    options={{
                        statusBarTranslucent: false,
                        statusBarColor: theme.colorBlack,
                        headerShown: true,
                        title: '',
                        headerTintColor: theme.colorWhite,
                        headerShadowVisible: false,
                        headerStyle: {
                            backgroundColor: theme.colorBlack,
                        },
                        headerTitleAlign: 'center',
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
            </Stack>
            <NoteOptions />
        </View>
    );
}