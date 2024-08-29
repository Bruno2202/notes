import React, { useState, useEffect } from 'react';
import { Redirect } from 'expo-router'; // Certifique-se de que você está importando de 'expo-router'
import { View } from 'react-native';
import { theme } from '@/theme';

export default function SignIn() {
    const isSignedIn = true;

    return (
        <View style={{backgroundColor: theme.colorBlack, flex: 1}}>
            {isSignedIn ? 
                <Redirect href="/(tabs)" /> 
            :
                <Redirect href="/(auth)" />
            }
        </View>
    );
}
