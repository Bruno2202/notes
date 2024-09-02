import { theme } from "@/theme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

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
            </Stack>
        </View>
    );
}