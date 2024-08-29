import React, { createContext, ReactNode, useEffect, useState } from "react";
import { UserModel } from "../app/(api)/MODEL/UserModel";
import { UserController } from "../app/(api)/CONTROLLER/UserController";
import { View } from "react-native";

interface UserProviderProps {
    children: ReactNode;
}

interface UserContextType {
    userData: UserModel | null;
    setUserData: React.Dispatch<React.SetStateAction<UserModel | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({ children }: UserProviderProps) {
    const [userData, setUserData] = useState<UserModel | null>(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const data = await UserController.selectById(20);
                setUserData(data);
            } catch (error) {
                console.error("Erro ao obter dados do usuário:", error);
                setUserData(null);
            }
        }
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}