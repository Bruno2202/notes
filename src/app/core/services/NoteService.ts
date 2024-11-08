import { MarkerModel } from "../models/MarkerModel";
import { NoteModel } from "../models/NoteModel";

interface NoteTypes {
    userId: number
    typeId: number
    creationDate: Date
    id: number
    title: string
    content: string
    markers: MarkerType[]
}

interface MarkerType {
    userId: number
    description: string
    id: number
}

export class NoteService {
    // static async selectAllUsersNotes(token: string) {
    //     try {
    //         const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/notes`,
    //             {
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': token,
    //                     'Content-Type': 'application/json'
    //                 }
    //             }
    //         );

    //         const data = await response.json();

    //         console.log('Resposta da API:', data);
    //     } catch (error: any) {
    //         console.error('Erro na requisição:', error.message);
    //     }
    // }

    static async selectById(token: string, id: number): Promise<NoteModel | null> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/notes/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
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

    static async selectByUserId(token: string, id: number): Promise<NoteModel[]> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/notes/user/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                const completeNotes: NoteModel[] = data.map((item: NoteTypes) => {
                    const note = new NoteModel(
                        item.userId,
                        item.typeId,
                        item.creationDate,
                        item.id,
                        item.title,
                        item.content,
                    );

                    const markers: MarkerModel[] = item.markers.map((marker: MarkerType) => {
                        return new MarkerModel(
                            marker.userId,
                            marker.description,
                            marker.id
                        )
                    })

                    note.setMarkers = markers;

                    return note;
                });

                return completeNotes;
            }

            return [];
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async create(token: string, note: NoteModel): Promise<NoteModel | null> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/notes`, {
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
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/notes`, {
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

    static async delete(token: string, id: number): Promise<boolean> {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_APIHOST}/notes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
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
}