import React, { createContext, ReactNode, useEffect, useState } from "react";

interface UserProviderProps {
    children: ReactNode;
}

export interface AppInfoType {
    reactNativeVersion: string;
    reactVersion: string;
}

export const AppInfoContext = createContext<AppInfoType | null>(null);

export default function AppInfoProvider({ children }: UserProviderProps) {
    const [reactNativeVersion, setReactNativeVersion] = useState('');
    const [reactVersion, setReactVersion] = useState('');

    useEffect(() => {
        const jsonData = require('../../package.json');

        setReactNativeVersion(jsonData.dependencies["react-native"]);
        setReactVersion(jsonData.dependencies["react"]);
    }, []); 

    return (
        <AppInfoContext.Provider value={{
            reactNativeVersion,
            reactVersion
        }}>
            {children}
        </AppInfoContext.Provider>
    );
} 