import React, { createContext, ReactNode, useState } from "react";

interface Props {
    children: ReactNode;
}

interface ModalContextTypes {
    filterIsVisible: boolean;
    setFilterIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextTypes | null>(null);

export default function ModalProvider({ children }: Props) {
    const [filterIsVisible, setFilterIsVisible] = useState<boolean>(false);

    return (
        <ModalContext.Provider value={{
            filterIsVisible,
            setFilterIsVisible,
        }}>
            {children}
        </ModalContext.Provider>
    );
} 