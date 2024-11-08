import React, { createContext, ReactNode, useEffect, useState } from "react";

interface LoadingProvidersProps {
    children: ReactNode;
}

interface LoadingContextTypes {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingContextTypes | null>(null);

export default function LoadingProvider({ children }: LoadingProvidersProps) {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{
            loading,
            setLoading,
        }}>
            {children}
        </LoadingContext.Provider>
    );
} 