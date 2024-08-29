import { UserDAL } from "../DAL/UserDAL";
import { UserModel } from "../MODEL/UserModel";

export class UserBLL {
    static async selectById(id: number): Promise<UserModel | null> {
        if (id <= 0) {
            throw new Error('ID inválido para busca');
        }
        try {
            const userData = await UserDAL.selectById(id);
            if (userData) {
                return userData;
            }
            return null;
        } catch (error: any) {
            console.log(`Erro ao tentar buscar usuário pelo ID na BLL: ${error.message}`);
            throw error;
        }
    }

    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isValidPassword(password: string): boolean {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
        return passwordRegex.test(password);
    }

    static async existingUser(email: string): Promise<boolean> {
        const user = await UserDAL.selectByEmail(email);

        return !!user;
    }

    static async validateFields(user: UserModel): Promise<boolean> {
        if (!UserBLL.isValidEmail(user.getEmail)) {
            throw new Error('Email inválido');
        }

        if (!UserBLL.isValidPassword(user.getPassword)) {
            throw new Error('Senha inválida');
        }

        if (await UserBLL.existingUser(user.getEmail)) {
            throw new Error('Usuário já existe');
        }

        return true;
    }

    static async registerUser(user: UserModel): Promise<boolean> {
        try {
            await UserBLL.validateFields(user);

            await UserDAL.create(user);

            return true;
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return false;
        }
    }

    static async update(user: UserModel): Promise<UserModel | null> {
        try {
            const updatedUser: UserModel | null = await UserDAL.update(user);
            return updatedUser;
        } catch (error ) {
            throw new Error(`Erro ao atualizar usuário: ${error}`);
        }
    }
}