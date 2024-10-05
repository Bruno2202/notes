import { NoteModel } from "../models/NoteModel";

interface NoteTypes {
    userId: number
    typeId: number
    creationDate: Date
    id: number
    title: string
    content: string
}

export class NoteService {
    // static async select() { }

    static async selectById(id: number): Promise<NoteModel | null> {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/notes/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                return new NoteModel(
                    data.userId,
                    data.typeId,
                    data.creationDate,
                    data.id,
                    data.title,
                    data.content
                )
            }

            throw new Error(data.error);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async selectByUserId(id: number): Promise<NoteModel[] | null> {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/notes/user/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                const notes = data.map((note: NoteTypes) => {
                    return new NoteModel(
                        note.userId,
                        note.typeId,
                        note.creationDate,
                        note.id,
                        note.title,
                        note.content
                    )
                });

                return notes;
            }

            throw new Error(data.error);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async create(note: NoteModel): Promise<NoteModel | null> {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    note: note,
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

    static async update(note: NoteModel): Promise<NoteModel | null> {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/notes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    note: note,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                return new NoteModel(
                    data.userId,
                    data.typeId,
                    data.creationDate,
                    data.id,
                    data.title,
                    data.content
                );
            }

            throw new Error(data.error)
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async delete(id: number): Promise<boolean> {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/notes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            const data = await response.json();

            console.log(data)
    
            if (response.ok) {
                return data.deleted
            }
    
            console.error(`Erro ao deletar nota: ${data.message}`);
            return false;
        } catch (error: any) {
            console.error(`Erro ao deletar nota: ${error.message}`);
            throw new Error(error.message);
        }
    }
}