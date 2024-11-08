import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { theme } from "@/theme";

import TabBarGradient from "@/src/components/TabBarGradient";
import BottomModal from "@/src/components/BottomModal";
import { useContext } from "react";
import { ModalContext } from "@/src/contexts/ModalContext";

export default function TabLayout() {
    const { filterIsVisible, setFilterIsVisible } = useContext(ModalContext)!;

    return (
        <View style={{ backgroundColor: theme.colorBlack, flex: 1 }}>
            <StatusBar backgroundColor={theme.colorBlack} />
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
                        zIndex: 1,
                    },
                    tabBarActiveTintColor: theme.colorWhite,
                    tabBarInactiveTintColor: theme.colorGrey,
                    tabBarHideOnKeyboard: true,
                }}
            >
                <Tabs.Screen
                    name="(drawer)"
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="notes" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="addNote"
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="add-box" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="user"
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="person" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
            <BottomModal
                title="Filtro de Notas"
                isVisible={filterIsVisible}
                onClose={() => setFilterIsVisible(!filterIsVisible)}
            />
            <TabBarGradient />
        </View>
    );
}
