import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TokenDataTypes {
    id: string;
    email: string;
    iat: number;
    exp?: number;
}

export class TokenService {
    static async getTokenData(token: string): Promise<TokenDataTypes | undefined> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/token/data`, {
                method: 'POST',
                headers: {
                    'Authorization': process.env.EXPO_PUBLIC_SECRET!,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                }),
            });

            const jwtData = await response.json();

            if (jwtData.error) {
                throw new Error(jwtData.error);
            }
            
            const data: TokenDataTypes = {
                id: jwtData.data.id,
                email: jwtData.data.email,
                iat: jwtData.data.id
            }

            return data;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    static async storeToken(token: string) {
        try {
            await AsyncStorage.setItem('@UserToken', token);
        } catch (error) {
            console.log(`Erro ao salvar token: ${error}`);
        }
    }

    static async getToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem('@UserToken');
        } catch (error) {
            console.log(`Erro ao recupar token: ${error}`)
            return null;
        }
    }

    static async removeToken() {
        try {
            await AsyncStorage.removeItem('@UserToken');
        } catch (error) {
            console.log(`Erro ao remover token: ${error}`);
        }
    }
}


