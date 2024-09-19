import { UserModel } from "../models/UserModel";

interface UserResponse {
    name: string;
    email: string;
    password: string;
    id: number;
    userPic: string | null;
}

export class UserService {
    static async selectById(id: number): Promise<UserModel | null> {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/usuarios/id/${id}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();

                const user: UserResponse = {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    id: data.id,
                    userPic: data.userPic
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

    static async validateFields(user: UserModel): Promise<boolean> {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/usuarios/validar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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

    static async register(user: UserModel): Promise<UserModel | null> {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                return data;
            }

            throw new Error(data.error);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async update(user: UserModel): Promise<UserModel | null> {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/usuarios`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const user: UserResponse = {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    id: data.id,
                    userPic: data.userPic
                }

                return new UserModel(
                    user.name,
                    user.email,
                    user.password,
                    user.id,
                    user.userPic
                );
            }

            throw new Error(data.error);
        } catch (error: any) {
            throw new Error(error.message); 
        }
    }
}