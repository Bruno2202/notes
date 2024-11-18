import { router } from 'expo-router';

import { TokenService } from './TokenService';
import { UserModel } from '../models/UserModel';

export interface authResponse {
    success: boolean;
    message?: string;
    error?: string;
    user?: UserModel;
    token?: string;
}

export class AuthService {
    static async login(email: string, password: string): Promise<authResponse> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.EXPO_PUBLIC_SECRET!,
                },
                body: JSON.stringify({
                    user: {
                        email: email,
                        password: password,
                    }
                }),
            });

            return await response.json();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async register(user: UserModel): Promise<authResponse> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.EXPO_PUBLIC_SECRET!,
                },
                body: JSON.stringify({
                    user: user,
                }),
            });
            
            return await response.json();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async logout() {
        try {
            await TokenService.removeToken();
            router.replace('/(auth)');
        } catch (error) {
            console.log(`Erro ao realizar logout: ${error}`)
        }
    }
}
