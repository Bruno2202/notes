import Toast from "react-native-toast-message";
import { NoteModel } from "../models/NoteModel";
import { NoteService } from "../services/NoteService";
import { UserModel } from "../models/UserModel";

export class NoteController {
	static async createNote(token: string, user: UserModel, note: NoteModel) {
		try {
			await NoteService.create(
				token,
				new NoteModel(
					user?.getId!,
					1,
					new Date(),
					undefined,
					note?.getTitle,
					note?.getContent,
				)
			);


			Toast.show({
				type: 'success',
				text1: 'Nota salva com sucesso!',
			});
		} catch (error: any) {
			console.log(`Erro ao criar nota: ${error.message}`);
			Toast.show({
				type: 'error',
				text1: 'Não foi possível salvar nota',
			});
		}
	}

	static async fetchNotes(token: string, user: UserModel): Promise<NoteModel[]> {
		try {
			return await NoteService.selectByUserId(token, user?.getId!);
		} catch (error: any) {
			switch (error.message) {
				case 'Notas não encontradas':
					return [];

				default:
					console.log(`Erro ao buscar notas: ${error.message}`);
					Toast.show({
						type: 'error',
						text1: 'Não foi possível buscar notas',
					});
					return [];
			}
		}
	}

	static async updateNote(token: string, note: NoteModel) {
		try {
			await NoteService.update(token, note);
		} catch (error: any) {
			console.log(`Erro ao atualizar nota: ${error.message}`);
			Toast.show({
				type: 'error',
				text1: 'Não foi possível atualizar nota',
			});
		}
	}

	static async deleteNote(token: string, id: string) {
		try {
			const deleted = await NoteService.delete(token, id);

			if (deleted) {
				Toast.show({
					type: 'success',
					text1: 'Nota deletada com sucesso!',
				});
			}
		} catch (error: any) {
			console.log(`Erro ao deletar nota: ${error.message}`);
			Toast.show({
				type: 'error',
				text1: 'Não foi possível excluir nota',
			});
		}
	}

	static async addMarkerToNote(noteId: string, markerId: string, token: string) {
		try {
			await NoteService.addMarkerToNote(noteId, markerId, token);
		} catch (error: any) {
			console.log(`Erro ao salvar marcador na nota: ${error.message}`);
		}
	}

	static async removeMarkerFromNote(noteId: string, markerId: string, token: string) {
		try {
			await NoteService.removeMarkerFromNote(noteId, markerId, token);
		} catch (error: any) {
			console.log(`Erro ao deletar marcador na nota: ${error.message}`);
		}
	}
}
