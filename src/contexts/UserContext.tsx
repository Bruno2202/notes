import React, { createContext, ReactNode, useEffect, useState } from "react";

import { UserModel } from "../app/core/models/UserModel";
import { UserService } from "../app/core/services/UserService";
import { TokenService } from "../app/core/services/TokenService";
import { TokenDataTypes } from "../app/core/services/TokenService";

interface UserProviderProps {
    children: ReactNode;
}

interface UserContextType {
    userData: UserModel | null;
    setUserData: React.Dispatch<React.SetStateAction<UserModel | null>>;
    token: string | undefined;
    setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({ children }: UserProviderProps) {
    const [userData, setUserData] = useState<UserModel | null>(null);
    const [token, setToken] = useState<string | undefined>(undefined);
    const [tokenData, setTokenData] = useState<TokenDataTypes | undefined>(undefined);

    useEffect(() => {
        async function fetchTokenData() {
            const token = await TokenService.getToken();

            if (token) {
                const data: TokenDataTypes | undefined = await TokenService.getTokenData(token);
                setTokenData(data);
            }
        }

        fetchTokenData();
    }, [token]);

    useEffect(() => {
        async function fetchUserData() {
            if (tokenData?.id) {
                try {
                    const data = await UserService.selectById(tokenData.id, token!);

                    if (data) {
                        const user = new UserModel(
                            data.getName,
                            data.getEmail,
                            data.getPassword,
                            data.getCreationDate,
                            data.getId,
                            data.getUserPic
                        );
                        setUserData(user);
                    }
                } catch (error) {
                    console.error("Erro ao obter dados do usuário:", error);
                    setUserData(null);
                }
            }
        }

        fetchUserData();
    }, [tokenData]);

    return (
        <UserContext.Provider value={{
            userData,
            setUserData,
            token,
            setToken
        }}>
            {children}
        </UserContext.Provider>
    );
} 