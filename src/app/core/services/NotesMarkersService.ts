import { MarkerModel } from "../models/MarkerModel";
import NotesMarkersModel from "../models/NotesMarkersModel";

export default class NotesMarkersService {
    static async create(noteMarker: NotesMarkersModel) {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/notesMarkers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    noteMarker: noteMarker
                }),
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

    static async delete(noteMarker: NotesMarkersModel) {
        try {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_APIHOST}:${process.env.EXPO_PUBLIC_APIPORT}/notesMarkers`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    noteMarker: noteMarker,
                }),
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
}
