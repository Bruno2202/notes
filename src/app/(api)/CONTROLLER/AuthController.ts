import { router } from 'expo-router';
import { AuthBLL } from '../BLL/AuthBLL';
import { TokenModel } from '../MODEL/TokenModel';

export class AuthController {
    static async login(email: string, password: string): Promise<boolean|undefined> {
        try {
            const user = await AuthBLL.validateLogin(email, password);

            if (user != null) {
                await TokenModel.storeUserToken(TokenModel.generateToken(user));
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Erro ao realizar o login:', error);
        }
    }

    static async logout() {
        try {
            await TokenModel.removeToken();
            router.push('../(auth)');
        } catch (error) {
            console.log(`Erro ao realizar logout: ${error}`)
        }
    }
}
