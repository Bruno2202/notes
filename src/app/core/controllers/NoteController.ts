import Toast from "react-native-toast-message";
import { NoteModel } from "../models/NoteModel";
import { noteResponse, NoteService } from "../services/NoteService";
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

	static async shareNote(sharedBy: string, sharedWith: string, noteId: string, sharedAt: Date, token: string) {
		try {
			const res = await NoteService.shareNote(sharedBy, sharedWith, noteId, sharedAt, token);

			if (res.success) {
				Toast.show({
					type: 'success',
					text1: 'Nota compartilhada com sucesso!',
				});
			} else {
				Toast.show({
					type: 'info',
					text1: 'Essa nota já foi compartilhada',
				});
			}
		} catch (error: any) {
			console.log(`Erro ao compartilhar nota: ${error.message}`);
			Toast.show({
				type: 'error',
				text1: 'Não foi possível compartilhar nota',
			});
		}
	}

	static async unshareNote(noteId: string, sharedWith: string, token: string) {
		try {
			const res = await NoteService.unshareNote(noteId, sharedWith, token);

			if (res.success) {
				Toast.show({
					type: 'success',
					text1: res.message,
				});
			} else {
				Toast.show({
					type: 'error',
					text1: 'Não foi possível descompartilhar nota',
				});
			}
		} catch (error: any) {
			console.log(`Erro ao descompartilhar nota: ${error.message}`);
			Toast.show({
				type: 'error',
				text1: 'Não foi possível descompartilhar nota',
			});
		}
	}

	static async fetchSharedNotes(userId: string, token: string): Promise<NoteModel[]> {
		try {
			return await NoteService.fetchSharedNotes(userId, token);
		} catch (error: any) {
			console.log(`Erro ao buscar notas compartilhadas: ${error.message}`);
			Toast.show({
				type: 'error',
				text1: 'Não foi possível buscar notas compartilhadas',
			});

			return [];
		}
	}	
	
	static async fetchAllMergedNotes(token: string, userData: UserModel): Promise<NoteModel[]> {
		const userNotes: NoteModel[] = await NoteController.fetchNotes(token!, userData!);
		const sharedNotes: NoteModel[] = await NoteController.fetchSharedNotes(userData?.getId!, token!);

		const mergedNotes = [...userNotes, ...sharedNotes].filter(
			(note, index, self) =>
				index === self.findIndex((n) => n.getId === note.getId)
		);

        return mergedNotes;
	}
}
