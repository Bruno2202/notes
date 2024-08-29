import Toast from "react-native-toast-message";
import { UserBLL } from "../BLL/UserBLL";
import { UserModel } from "../MODEL/UserModel";

export class UserController {
    static async selectById(id: number): Promise<UserModel | null> {
        try {
            const user = await UserBLL.selectById(id);
            return user;
        } catch (error: any) {
            console.log(`Erro ao tentar buscar usuário pelo ID: ${error.message}`);
            return null;
        }
    }

    static async update(user: UserModel): Promise<UserModel | null> {
        try {
            const updatedUser: UserModel | null = await UserBLL.update(user);
            
            Toast.show({
                type: 'success',
                text1: 'Perfil atualizado!',
                text2: 'As informações do usuário foram salvas com sucesso.'
            });
            
            return updatedUser;
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Erro na atualização',
                text2: 'Houve um problema ao salvar as informações. Tente novamente.'
            });

            console.log(`Erro ao tentar autalizar usuário: ${error.message}`);
            return null;
        }
    }

    static async validateFields(user: UserModel): Promise<boolean> {
        try {
            await UserBLL.validateFields(user);
            return true;
        } catch (error: any) {
            switch (error.message) {
                case 'Email inválido':
                    Toast.show({
                        type: 'error',
                        text1: 'Email inválido',
                        text2: 'Verifique o endereço de email'
                    });
                    break;

                case 'Senha inválida':
                    Toast.show({
                        type: 'error',
                        text1: 'Senha inválida',
                        text2: 'Verifique a senha inserida'
                    });
                    break;

                case 'Usuário já existe':
                    Toast.show({
                        type: 'error',
                        text1: 'Esse usuário já existe',
                        text2: 'Tente inserir outro endereço de email'
                    });
                    break;

                default:
                    Toast.show({
                        type: 'error',
                        text1: 'Erro desconhecido',
                        text2: 'Tente novamente mais tarde'
                    });
                    console.log("Erro desconhecido:", error.message);
                    break;
            }
            return false;
        }
    }

    static async registrer(user: UserModel): Promise<boolean> {
        try {
            await UserBLL.registerUser(user);

            Toast.show({
                type: 'success',
                text1: 'Cadastro realizado com sucesso!',
                text2: 'Você pode fazer login'
            });

            return true;
        } catch (error: any) {
            switch (error.message) {
                case 'Email inválido':
                    Toast.show({
                        type: 'error',
                        text1: 'Email inválido',
                        text2: 'Verifique o endereço de email'
                    });
                    break;
                case 'Senha inválida':
                    Toast.show({
                        type: 'error',
                        text1: 'Senha inválida',
                        text2: 'Verifique a senha inserida'
                    });
                    break;
                case 'Usuário já existe':
                    Toast.show({
                        type: 'error',
                        text1: 'Esse usuário já existe',
                        text2: 'Tente inserir outro endereço de email'
                    });
                    break;
                default:
                    Toast.show({
                        type: 'error',
                        text1: 'Error desconhecido',
                        text2: 'Tente novamente mais tarde'
                    });
                    console.log("Erro desconhecido:", error.message);
                    break;
            }
            return false;
        }
    }
}