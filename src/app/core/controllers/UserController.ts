import Toast from "react-native-toast-message";
import { UserModel } from "../models/UserModel";
import { UserService } from "../services/UserService";

export class UserController {
    static async fetchNotes(token: string): Promise<UserModel[]> {
        try {
            return await UserService.fetchUsers(token);
        } catch (error: any) {
            switch (error.message) {
                case 'Usuários não encontrados':
                    return [];

                default:
                    console.log(`Erro ao buscar usuários: ${error.message}`);
                    Toast.show({
                        type: 'error',
                        text1: 'Não foi possível buscar os usuários',
                    });
                    return [];
            }
        }
    }
}
