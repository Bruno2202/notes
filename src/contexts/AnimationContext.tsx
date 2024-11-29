import React, { createContext, ReactNode, useEffect, useState } from "react";

interface AnimationProps {
    children: ReactNode;
}

export interface AnimationType {
    welcomeIsVisible: boolean;
    setWelcomeIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AnimationContext = createContext<AnimationType | null>(null);

export default function AnimationProvider({ children }: AnimationProps) {
    const [welcomeIsVisible, setWelcomeIsVisible] = useState(true);

    return (
        <AnimationContext.Provider value={{
            welcomeIsVisible,
            setWelcomeIsVisible
        }}>
            {children}
        </AnimationContext.Provider>
    );
} 