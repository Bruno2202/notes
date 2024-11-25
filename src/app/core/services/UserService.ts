import { UserModel } from "../models/UserModel";

export class UserService {
    static async fetchUsers(token: string): Promise<UserModel[]> {
        try {
            const res = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/users`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                }
            });

            if (res.ok) {
                const data = await res.json();
                return data.map((user: any) => new UserModel(
                    user.name,
                    user.email,
                    user.password,
                    user.creationDate,
                    user.id,
                    user.userPic,
                ));
            }

            return [];
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async selectById(id: string, token: string): Promise<UserModel | null> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/user/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                }
            });

            if (response.ok) {
                const data = await response.json();

                return new UserModel(
                    data.name,
                    data.email,
                    data.password,
                    data.creationDate,
                    data.id,
                    data.userPic,
                );
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async validateFields(user: UserModel): Promise<boolean> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/user/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.EXPO_PUBLIC_SECRET!,
                },
                body: JSON.stringify({
                    user: user,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                return data.isValid;
            }

            throw new Error(data.error);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async update(user: UserModel, token: string): Promise<UserModel | null> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    user: user,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                return new UserModel(
                    data.name,
                    data.email,
                    data.password,
                    data.creationDate,
                    data.id,
                    data.userPic
                );
            }

            throw new Error(data.error);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async delete(id: string, token: string): Promise<boolean> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                },
            });

            const data = await response.json();

            console.log(data)

            if (response.ok) {
                return data.deleted
            }

            console.error(`Erro ao deletar usuário: ${data.message}`);
            return false;
        } catch (error: any) {
            console.error(`Erro ao deletar usuário: ${error.message}`);
            throw new Error(error.message);
        }
    }
}