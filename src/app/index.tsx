import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Redirect } from 'expo-router';

import { theme } from '@/theme';
import { TokenService } from './core/services/TokenService';
import { UserContext } from '../contexts/UserContext';

export default function Page() {
    const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

    const { setToken } = useContext(UserContext) ?? { setToken: () => { } };

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await TokenService.getToken();

                setIsSignedIn(!!token);

                if (token) {
                    setToken(token);
                }
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
