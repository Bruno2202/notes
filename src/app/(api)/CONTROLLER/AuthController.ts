import { AuthBLL } from '../BLL/AuthBLL';

export class AuthController {
    static async login(email: string, password: string): Promise<boolean|undefined> {
        try {
            const isValidLogin = await AuthBLL.validateLogin(email, password);

            if (isValidLogin) {
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Erro ao realizar o login:', error);
        }
    }
}
