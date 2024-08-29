import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "@/theme";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
    return (
        <View style={{ backgroundColor: theme.colorBlack, flex: 1 }}>
            <StatusBar
                backgroundColor={theme.colorBlack}
            />
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: theme.colorDarkGrey,
                        shadowColor: "#000000",
                        borderTopWidth: 0,
                    },
                    tabBarActiveTintColor: theme.colorWhite,
                    tabBarInactiveTintColor: theme.colorGrey,
                    tabBarHideOnKeyboard: true,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => {
                            return <MaterialIcons name="notes" size={size} color={color} />;
                        }
                    }}
                />
                <Tabs.Screen
                    name="user"
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => {
                            return <MaterialIcons name="person" size={size} color={color} />;
                        }
                    }}
                />
            </Tabs>
        </View>

    );
}
