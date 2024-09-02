import { router, Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View } from "react-native";
import { theme } from "@/theme";
import Toast from "react-native-toast-message";
import UserProvider from "../contexts/UserContext";

SplashScreen.preventAutoHideAsync();

import { useDrizzleStudio } from "expo-drizzle-studio-plugin"; // Dev tool
import * as SQLite from "expo-sqlite"; // Dev tool
const db = SQLite.openDatabaseSync("notes");// Dev tool

export default function Layout() {
    useDrizzleStudio(db); // Dev tool

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
        <View style={{ backgroundColor: theme.colorBlack, flex: 1 }}>
            <UserProvider>
                <Stack>
                    <Stack.Screen
                        name="index"
                        options={{
                            statusBarTranslucent: true,
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="(tabs)"
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
                </Stack>
                <Toast />
            </UserProvider>
        </View>
    );
}