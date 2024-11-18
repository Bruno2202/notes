import Toast from "react-native-toast-message";
import { UserModel } from "../models/UserModel";
import { AuthService, authResponse } from "../services/AuthService";

export class AuthController {
    static async login(email: string, password: string): Promise<authResponse> {
        try {
            const res = await AuthService.login(email, password);

            if (!res.success) {
                Toast.show({
                    type: 'error',
                    text1: 'Não foi possível fazer login',
                    text2: res.message,
                });
            }

            return res;
        } catch (error: any) {
            console.log(`Erro ao realizar login: ${error.message}`);
            Toast.show({
                type: 'error',
                text1: 'Não foi possível fazer login',
                text2: 'Tente novamente mais tarde',
            });

            return { success: false }
        }
    }

    static async register(user: UserModel): Promise<authResponse> {
        try {
            const res: authResponse = await AuthService.register(user);

            if (res.success) {
                Toast.show({
                    type: 'success',
                    text1: res.message,
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Não foi possível finalizar o cadastro',
                    text2: res.error,
                });
            }

            return res;
        } catch (error: any) {
            console.log(`Erro ao finalizar o cadastro: ${error.message}`);
            Toast.show({
                type: 'error',
                text1: 'Não foi possível finalizar o cadastro',
                text2: 'Tente novamente mais tarde',
            });

            return { success: false }
        }
    }
}
