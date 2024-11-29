import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from "react-native";
import Toast from "react-native-toast-message";

import { theme } from "@/theme";

import UserProvider from "../contexts/UserContext";
import NotesProvider from "../contexts/NoteContext";
import AppInfoProvider from "../contexts/AppInfoContext";
import LoadingProvider from "../contexts/LoadingContext";
import ModalProvider from "../contexts/ModalContext";
import AnimationProvider from "../contexts/AnimationContext";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [loaded, error] = useFonts({
        'fontFamilyBold': require('../../assets/fonts/PlusJakartaSans-Bold.ttf'),
        'fontFamilySemiBold': require('../../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
        'fontFamilyRegular': require('../../assets/fonts/PlusJakartaSans-Regular.ttf'),
        'fontFamilyMedium': require('../../assets/fonts/PlusJakartaSans-Medium.ttf'),
        'fontFamilyLight': require('../../assets/fonts/PlusJakartaSans-Light.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <UserProvider>
            <NotesProvider>
                <AppInfoProvider>
                    <LoadingProvider>
                        <ModalProvider>
                            <AnimationProvider>
                                <View style={{ backgroundColor: theme.colorBlack, flex: 1 }}>
                                    <Stack>
                                        <Stack.Screen
                                            name="index"
                                            options={{
                                                statusBarTranslucent: true,
                                                headerShown: false,
                                            }}
                                        />
                                        <Stack.Screen
                                            name="(drawer)"
                                            options={{
                                                statusBarTranslucent: true,
                                                statusBarColor: theme.colorBlack,
                                                headerShown: false,
                                            }}
                                        />
                                        <Stack.Screen
                                            name="(auth)"
                                            options={{
                                                statusBarTranslucent: true,
                                                headerShown: false,
                                            }}
                                        />
                                        <Stack.Screen
                                            name="(notes)"
                                            options={{
                                                statusBarTranslucent: true,
                                                headerShown: false,
                                            }}
                                        />
                                        <Stack.Screen
                                            name="(settings)"
                                            options={{
                                                statusBarTranslucent: true,
                                                headerShown: false,
                                            }}
                                        />
                                    </Stack>
                                    <Toast />
                                </View>
                            </AnimationProvider>
                        </ModalProvider>
                    </LoadingProvider>
                </AppInfoProvider>
            </NotesProvider>
        </UserProvider >
    );
}