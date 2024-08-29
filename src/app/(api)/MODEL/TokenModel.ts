import CryptoJS from 'crypto-js';
import { UserModel } from './UserModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class TokenModel {
    static generateToken(user: UserModel): string {
        const timestamp: string = Date.now().toString();
        const secretKey: any = process.env.EXPO_PUBLIC_SECRET_KEY;

        const hash = CryptoJS.SHA256(`${user.getId}.${timestamp}.${secretKey}`).toString(CryptoJS.enc.Hex);
        const token = `${hash}.${user.getId}`

        return token;
    }

    static async storeUserToken(token: string) {
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

    static extractTokenData(token: string): number | null {
        const [_, id] = token.split('.');
        if (!id) {
            return null;
        }
        const userId = Number(id);
        return isNaN(userId) ? null : userId;
    }

    static verifyToken(token: string, user: UserModel): boolean {
        const userId = this.extractTokenData(token);

        return userId === Number(user.getId);
    }

    static async removeToken() {
        try {
            await AsyncStorage.removeItem('@UserToken');
          } catch(error) {
            console.log(`Erro ao remover token: ${error}`);
          }
    }
}


