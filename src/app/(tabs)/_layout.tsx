import { Stack, Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { theme } from "@/theme";
import NoteProvider, { NoteContext } from "@/src/contexts/NoteContext";
import { LinearGradient } from "expo-linear-gradient";
import TabBarGradient from "@/src/components/TabBarGradient";

export default function Layout() {
    return (
        <View style={{ backgroundColor: theme.colorBlack, flex: 1 }}>
            <StatusBar
                backgroundColor={theme.colorBlack}
            />
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        position: 'absolute',
                        backgroundColor: 'transparent',
                        shadowColor: 'transparent',
                        borderTopWidth: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 99
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
                    name="addNote"
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => {
                            return <MaterialIcons name="add-box" size={size} color={color} />;
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
            <TabBarGradient />
        </View>
    );
}
