import { router } from 'expo-router';

import { TokenService } from './TokenService';
import { UserModel } from '../models/UserModel';

interface UserResponse {
    name: string;
    email: string;
    password: string;
    id: number;
    userPic: string | null;
}

export class AuthService {
    static async login(email: string, password: string): Promise<UserModel | null> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        email: email,
                        password: password,
                    }
                }),
            });

            const data = await response.json();

            if (data.user) {
                const user: UserResponse = {
                    name: data.user.name,
                    email: data.user.email,
                    password: data.user.password,
                    id: data.user.id,
                    userPic: data.user.userPic
                }

                return new UserModel(
                    user.name,
                    user.email,
                    user.password,
                    user.id,
                    user.userPic
                );
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async logout() {
        try {
            await TokenService.removeToken();
            router.replace('../(auth)');
        } catch (error) {
            console.log(`Erro ao realizar logout: ${error}`)
        }
    }
}
