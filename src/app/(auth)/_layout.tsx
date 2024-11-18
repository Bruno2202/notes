import { theme } from "@/theme";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {
    return (
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
                    name="signUp"
                    options={{
                        title: "",
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: theme.colorBlack,
                        },
                        headerTintColor: theme.colorWhite,
                        headerShadowVisible: false,
                        animation: 'ios',
                    }}
                />
                <Stack.Screen
                    name="userPic"
                    options={{
                        title: "",
                        statusBarTranslucent: true,
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: theme.colorBlack,
                        },
                        headerTintColor: theme.colorWhite,
                        headerShadowVisible: false,
                        animation: 'ios',
                    }}
                />
                <Stack.Screen
                    name="forgot"
                    options={{
                        title: "",
                        statusBarTranslucent: true,
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: theme.colorBlack,
                        },
                        headerTintColor: theme.colorWhite,
                        headerShadowVisible: false,
                        animation: 'ios',
                    }}
                />
            </Stack>
        </View>
    );
}