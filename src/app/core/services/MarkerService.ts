import { MarkerModel } from "../models/MarkerModel";

interface MarkerTypes {
    userId: number;
    description: string;
    id: number;
}

export class MarkerService {
    static async selectById(token: string, id: number): Promise<MarkerModel | null> {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/marker/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                return new MarkerModel(
                    data.userId,
                    data.description,
                    data.id
                )
            }

            throw new Error(data.error);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async selectByUserId(token: string, id: number): Promise<MarkerModel[]> {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/marker/user/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                if (data.length > 0) {
                    const markers = data.map((marker: MarkerTypes) => {
                        return new MarkerModel(
                            marker.userId,
                            marker.description,
                            marker.id
                        )
                    });

                    return markers;
                }

                return data.markers;
            }

            throw new Error(data.error);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async selectByNoteId(token: string, id: number): Promise<MarkerModel[]> {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/marker/note/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                const markers = data.map((marker: MarkerTypes) => {
                    return new MarkerModel(
                        marker.userId,
                        marker.description,
                        marker.id,
                    )
                });

                return markers;
            }

            throw new Error(data.error);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async create(token: string, marker: MarkerModel): Promise<MarkerModel | null> {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/marker`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    marker: marker,
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

    static async update(token: string, marker: MarkerModel): Promise<MarkerModel | null> {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/marker`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    marker: marker,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                return new MarkerModel(
                    data.userId,
                    data.description,
                    data.id
                );
            }

            throw new Error(data.error)
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async delete(token: string, id: number) {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/marker/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const data = await response.json();
                console.error(`Erro ao deletar nota: ${data?.error || 'Erro desconhecido'}`);
                throw new Error(data?.message || 'Erro ao deletar marcador');
            }

            return;
        } catch (error: any) {
            console.error(`Erro ao deletar nota: ${error.message}`);
            throw new Error(error.message);
        }
    }
}