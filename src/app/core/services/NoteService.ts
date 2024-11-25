import { NoteController } from "../controllers/NoteController";
import { MarkerModel } from "../models/MarkerModel";
import { NoteModel } from "../models/NoteModel";
import { UserModel } from "../models/UserModel";

export interface noteResponse {
    success: boolean;
    message?: string;
    error?: string;
    note?: NoteModel;
    notes?: NoteModel[];
}

export class NoteService {
    static async selectById(token: string, id: string): Promise<NoteModel | null> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/note/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
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

    static async selectByUserId(token: string, id: string): Promise<NoteModel[]> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/notes/user/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                },
            });

            const data = await response.json();

            if (response.ok) {
                const notes: NoteModel[] = data.map((item: any) => {
                    const note = new NoteModel(
                        item.userId,
                        item.typeId,
                        item.creationDate,
                        item.id,
                        item.title,
                        item.content,
                        item.color,
                        item.markers.map((marker: any) => {
                            return new MarkerModel(
                                marker.userId,
                                marker.description,
                                marker.id
                            )
                        })
                    );

                    return note;
                });

                return notes;
            }

            return [];
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async create(token: string, note: NoteModel): Promise<NoteModel | null> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/note`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
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

    static async update(token: string, note: NoteModel): Promise<NoteModel | null> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/note`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
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

    static async delete(token: string, id: string): Promise<boolean> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/note/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                },
            });

            const data = await response.json();

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

    static async addMarkerToNote(noteId: string, markerId: string, token: string) {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/note/${noteId}/marker/${markerId}/add`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                },
            });

            if (!response.ok) {
                let data;
                try {
                    data = await response.json();
                } catch (error) {
                    throw new Error(`Erro ao salvar marcador na nota: ${response.statusText}`);
                }
                console.error(`Erro ao salvar marcador na nota: ${data.error}`);
                throw new Error(data.message);
            }

            return;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async removeMarkerFromNote(noteId: string, markerId: string, token: string) {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/note/${noteId}/marker/${markerId}/remove`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                },
            });

            if (!response.ok) {
                let data;
                try {
                    data = await response.json();
                } catch (error) {
                    throw new Error(`Erro ao deletar marcador da nota: ${response.statusText}`);
                }
                console.error(`Erro ao deletar marcador da nota: ${data.error}`);
                throw new Error(data.message);
            }

            return;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async shareNote(sharedBy: string, sharedWith: string, noteId: string, sharedAt: Date, token: string): Promise<noteResponse> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/share-note`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    sharedBy: sharedBy,
                    sharedWith: sharedWith,
                    noteId: noteId,
                    sharedAt: sharedAt
                })
            });

            return await response.json();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async unshareNote(noteId: string, sharedWith: string, token: string): Promise<noteResponse> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/unshare-note`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    noteId: noteId,
                    sharedWith: sharedWith,
                })
            });

            return await response.json();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async fetchSharedNotes(userId: string, token: string): Promise<NoteModel[]> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/notes/shared-with/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                }
            });

            const res = await response.json();

            const notes: NoteModel[] = res.notes.map((item: any) => {
                const note = new NoteModel(
                    item.userId,
                    item.typeId,
                    item.creationDate,
                    item.id,
                    item.title,
                    item.content,
                    item.color,
                    item.markers.map((marker: any) => {
                        return new MarkerModel(
                            marker.userId,
                            marker.description,
                            marker.id
                        )
                    })
                );

                return note;
            });

            return notes;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}