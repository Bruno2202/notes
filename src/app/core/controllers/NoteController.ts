import Toast from "react-native-toast-message";
import { NoteModel } from "../models/NoteModel";
import { NoteService } from "../services/NoteService";
import { UserModel } from "../models/UserModel";

export class NoteController {
	static async createNote(user: UserModel, note: NoteModel) {
		try {
			await NoteService.create(
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

	static async fetchNotes(user: UserModel): Promise<NoteModel[]> {
		try {
			const notes = await NoteService.selectByUserId(user?.getId!);

			return notes;
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

	static async updateNote(note: NoteModel) {
		try {
			await NoteService.update(note);
		} catch (error: any) {
			console.log(`Erro ao atualizar nota: ${error.message}`);
			Toast.show({
				type: 'error',
				text1: 'Não foi possível atualizar nota',
			});
		}
	}

	static async deleteNote(id: number) {
		try {
			const deleted = await NoteService.delete(id);

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
}
