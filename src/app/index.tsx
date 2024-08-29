import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Redirect } from 'expo-router';
import { theme } from '@/theme';
import { TokenModel } from './(api)/MODEL/TokenModel';

export default function Page() {
    const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await TokenModel.getToken();
                console.log("Token:", token);
                setIsSignedIn(!!token);
            } catch (error) {
                console.log(`Erro ao verificar o token: ${error}`);
                setIsSignedIn(false);
            }
        };

        checkToken();
    }, []);

    if (isSignedIn === null) {
        return (
            <View style={{ backgroundColor: theme.colorBlack, flex: 1 }}>
            </View>
        );
    }

    return (
        <View style={{ backgroundColor: theme.colorBlack, flex: 1 }}>
            {isSignedIn ? (
                <Redirect href="/(tabs)" />
            ) : (
                <Redirect href="/(auth)" />
            )}
        </View>
    );
}
