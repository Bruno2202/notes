import { Stack, Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { theme } from "@/theme";

export default function Layout() {
    return (
        <View style={{ backgroundColor: theme.colorBlack, flex: 1 }}>
            <StatusBar
                backgroundColor={theme.colorBlack}
            />
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
                        },
                    }}
                />
                <Stack.Screen
                    name="info"
                    options={{
                        statusBarTranslucent: true,
                        headerShown: true,
                        title: '',
                        headerTintColor: theme.colorWhite,
                        headerShadowVisible: false,
                        headerStyle: {
                            backgroundColor: theme.colorBlack,
                        },
                    }}
                />
            </Stack>
        </View>

    );
}
