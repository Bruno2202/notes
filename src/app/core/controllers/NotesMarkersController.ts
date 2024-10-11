import NotesMarkersModel from "../models/NotesMarkersModel";
import NotesMarkersService from "../services/NotesMarkersService";

export default class NotesMarkersController {
    static async createNoteMarker(noteId: number, markerId: number) {
        const noteMarker: NotesMarkersModel = new NotesMarkersModel(noteId, markerId);
        
        try {
            await NotesMarkersService.create(noteMarker);
        } catch (error: any) {
            console.log(`Erro ao salvar marcador na nota: ${error.message}`);
        }
    }

    static async deleteNoteMarker(noteId: number, markerId: number) {
        const noteMarker: NotesMarkersModel = new NotesMarkersModel(noteId, markerId);

        try {
            await NotesMarkersService.delete(noteMarker);
        } catch (error: any) {
            console.log(`Erro ao deletar marcador na nota: ${error.message}`);
        }
    }
}
