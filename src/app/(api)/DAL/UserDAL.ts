import { SQLiteDatabase } from "expo-sqlite";
import { getDatabase } from "./db";
import { UserModel } from "../MODEL/UserModel";

interface UserRow {
    ID: number;
    NOME: string;
    EMAIL: string;
    SENHA: string;
    FOTO: string | null;
}

export class UserDAL {
    async select(): Promise<UserModel[]> {
        try {
            const db: SQLiteDatabase = await getDatabase();

            if (!db) {
                throw new Error('Não foi possível conectar ao banco de dados');
            }

            const results: UserRow[] = await db.getAllAsync('SELECT * FROM usuarios');

            db.closeAsync();

            return results.map(row => new UserModel(
                row.NOME,
                row.EMAIL,
                row.SENHA,
                row.ID,
                row.FOTO
            ));
        } catch (error) {
            console.error("Erro ao selecionar usuários:", error);
            throw error;
        }
    }

    static async selectById(id: number): Promise<UserModel | null> {
        try {
            const db: SQLiteDatabase = await getDatabase();

            if (!db) {
                throw new Error('Não foi possível conectar ao banco de dados');
            }

            const result: UserRow | null = await db.getFirstAsync('SELECT * FROM usuarios WHERE ID = ?', [id]);
        
            db.closeAsync();
        
            if (result) {
                return new UserModel(
                    result.NOME,
                    result.EMAIL,
                    result.SENHA,
                    result.ID,
                    result.FOTO
                );
            }

            return null;
        } catch (error: any) {
            console.error(`Erro ao buscar usuário: ${error.message}`);
            throw error;
        }
    }

    static async selectByEmail(email: string): Promise<UserModel | null> {
        try {
            const db: SQLiteDatabase = await getDatabase();

            if (!db) {
                throw new Error('Não foi possível conectar ao banco de dados');
            }

            const result: UserRow | null = await db.getFirstAsync('SELECT * FROM usuarios WHERE EMAIL = ?', [email]);

            db.closeAsync();

            if (result) {
                return new UserModel(
                    result.NOME,
                    result.EMAIL,
                    result.SENHA,
                    result.ID,
                    result.FOTO
                );
            }

            return null;
        } catch (error: any) {
            console.error(`Erro ao buscar usuário: ${error.message}`);
            throw error;
        }
    }

    static async create(user: UserModel): Promise<UserModel | null> {
        try {
            const db: SQLiteDatabase = await getDatabase();

            if (!db) {
                throw new Error('Não foi possível conectar ao banco de dados');
            }

            const sql = 'INSERT INTO usuarios (NOME, EMAIL, SENHA, FOTO) VALUES (?, ?, ?, ?)';
            const result = await db.runAsync(sql, [
                user.getName,
                user.getEmail,
                user.getPassword,
                user.getUserPic || null
            ]);

            if (result.lastInsertRowId) {
                console.log(`Usuário criado com sucesso!`);
                return new UserModel(
                    user.getName,
                    user.getEmail,
                    user.getPassword,
                    result.lastInsertRowId,
                    user.getUserPic
                );
            }

            db.closeAsync();

            return null;
        } catch (error: any) {
            console.log(`Erro ao criar usuário: ${error.message}`);
            throw error;
        }
    }

    static async update(user: UserModel): Promise<UserModel | null> {
        try {
            const db: SQLiteDatabase = await getDatabase();

            if (!db) {
                throw new Error('Não foi possível conectar ao banco de dados');
            }

            const sql = 'UPDATE usuarios SET NOME = ?, EMAIL = ?, SENHA = ?, FOTO = ? WHERE ID = ?';
            const result = await db.runAsync(sql, [
                user.getName,
                user.getEmail,
                user.getPassword,
                user.getUserPic || null,
                user.getId || null
            ]);

            if (result.changes > 0) {
                console.log(`Usuário atualizado com sucesso!`);

                db.closeAsync();

                return new UserModel(
                    user.getName,
                    user.getEmail,
                    user.getPassword,
                    user.getId,
                    user.getUserPic
                );
            } else {
                return user;
            }
        } catch (error: any) {
            console.log(`Erro ao criar usuário: ${error.message}`);
            throw error;
        }
    }
}