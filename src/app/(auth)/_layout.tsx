import { theme } from "@/theme";
import { Stack } from "expo-router";

export default function Layout() {
    return (
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
    );
}