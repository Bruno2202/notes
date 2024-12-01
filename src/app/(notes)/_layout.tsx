import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, BackHandler } from "react-native";

import { theme } from "@/theme";
import { Image } from "expo-image";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import NoteOptions from "@/src/components/NoteOptions";
import NoteProvider, { NoteContext } from "@/src/contexts/NoteContext";
import { useContext, useEffect, useState } from "react";
import ColorOptions from "@/src/components/ColorOptions";
import { UserContext } from "@/src/contexts/UserContext";

export default function Layout() {
    const [colorVisible, setColorVisible] = useState<boolean>(false);
    const [color, setColor] = useState<string>("");

    const { note } = useContext(NoteContext)!
    const { noteOptionsVisible, setNoteOptionsVisible } = useContext(NoteContext)!

    const router = useRouter();

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
                            <TouchableOpacity onPress={() => { router.navigate('/(tabs)') }}>
                                <MaterialIcons color={theme.colorWhite} size={22.5} name="arrow-back" />
                            </TouchableOpacity>
                        ),
                        // headerTitle: () => (
                        //     <TouchableOpacity onPress={() => setColorVisible(!colorVisible)}>
                        //         <MaterialIcons color={theme.colorWhite} size={28} name="color-lens" />
                        //     </TouchableOpacity>
                        // ),
                        headerRight: () => {
                            return (
                                note && (
                                    <TouchableOpacity onPress={() => setNoteOptionsVisible(!noteOptionsVisible)}>
                                        <MaterialCommunityIcons color={theme.colorWhite} size={28} name="dots-horizontal" />
                                    </TouchableOpacity>
                                )

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
                <Stack.Screen
                    name="shareModal"
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
            {colorVisible && <ColorOptions setColor={setColor} />}
            <NoteOptions />
        </View>
    );
}