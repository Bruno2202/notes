import Toast from "react-native-toast-message";
import { UserModel } from "../models/UserModel";
import { MarkerService } from "../services/MarkerService";
import { MarkerModel } from "../models/MarkerModel";

export class MarkerController {
    static async createMarker(token: string, user: UserModel, descritpion: string) {
        try {
            await MarkerService.create(
                token,
                new MarkerModel(
                    user?.getId!,
                    descritpion,
                )
            );
        } catch (error: any) {
            console.log(`Erro ao criar marcador: ${error.message}`);
            Toast.show({
                type: 'error',
                text1: error.message,
            });
        }
    }

    static async fetchMarkers(token: string, user: UserModel): Promise<MarkerModel[]> {
        try {
            const markers = await MarkerService.selectByUserId(token!, user?.getId!);

            return markers;
        } catch (error: any) {
            switch (error.message) {
                case 'O usuário não possui marcadores':
                    return [];

                case 'Marcadores da nota não encontrados':
                    return [];

                default:
                    console.log(`Erro ao buscar marcadores: ${error.message}`);
                    Toast.show({
                        type: 'error',
                        text1: 'Não foi possível buscar marcadores',
                    });
                    return [];
            }
        }
    }

    static async fetchNoteMarkers(token: string, id: string): Promise<MarkerModel[]> {
        try {
            const markers = await MarkerService.selectByNoteId(token, id);

            return markers;
        } catch (error: any) {
            switch (error.message) {
                case 'A nota não possui marcadores':
                    return [];

                case 'Marcadores da nota não encontrados':
                    return [];

                default:
                    console.log(`Erro ao buscar marcadores: ${error.message}`);
                    Toast.show({
                        type: 'error',
                        text1: 'Não foi possível buscar marcadores',
                    });
                    return [];
            }
        }
    }

    static async updateMarker(token: string, marker: MarkerModel) {
        try {
            await MarkerService.update(token, marker);
        } catch (error: any) {
            console.log(`Erro ao atualizar marcador: ${error.message}`);
            Toast.show({
                type: 'error',
                text1: 'Não foi possível atualizar marcador',
            });
        }
    }

    static async deleteMarker(token: string, id: string) {
        try {
            await MarkerService.delete(token, id);
        } catch (error: any) {
            console.log(`Erro ao deletar marcador: ${error.message}`);
            Toast.show({
                type: 'error',
                text1: 'Não foi possível excluir marcador',
            });
        }
    }
}
