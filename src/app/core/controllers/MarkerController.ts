import Toast from "react-native-toast-message";
import { UserModel } from "../models/UserModel";
import { MarkerService } from "../services/MarkerService";
import { MarkerModel } from "../models/MarkerModel";

export class MarkerController {
    static async createMarker(user: UserModel, descritpion: string) {
        try {
            await MarkerService.create(
                new MarkerModel(
                    user?.getId!,
                    descritpion,
                )
            );

            Toast.show({
                type: 'success',
                text1: 'Marcador criado com sucesso!',
            });
        } catch (error: any) {
            console.log(`Erro ao criar marcador: ${error.message}`);
            Toast.show({
                type: 'error',
                text1: 'Não foi possível criar marcador',
            });
        }
    }

    static async fetchMarkers(user: UserModel): Promise<MarkerModel[] | null> {
        try {
            const markers = await MarkerService.selectByUserId(user?.getId!);

            if (markers) {
                return markers;
            }

            return null;
        } catch (error: any) {
            switch (error.message) {
                case 'O usuário não possui marcadores':
                    return null;

                case 'Marcadores não encontrados':
                    return null;

                default:
                    console.log(`Erro ao buscar marcadores: ${error.message}`);
                    Toast.show({
                        type: 'error',
                        text1: 'Não foi possível buscar marcadores',
                    });
                    break;
            }
            return null;
        }
    }

    static async fetchNoteMarkers(id: number): Promise<MarkerModel[] | null> {
        try {
            const markers = await MarkerService.selectByNoteId(id);

            if (markers) {
                return markers;
            }

            return null;
        } catch (error: any) {
            switch (error.message) {
                case 'A nota não possui marcadores':
                    return null;

                case 'Marcadores não encontrados':
                    return null;

                default:
                    console.log(`Erro ao buscar marcadores: ${error.message}`);
                    Toast.show({
                        type: 'error',
                        text1: 'Não foi possível buscar marcadores',
                    });
                    break;
            }
            return null;
        }
    }

    static async updateMarker(marker: MarkerModel) {
        try {
            await MarkerService.update(marker);
        } catch (error: any) {
            console.log(`Erro ao atualizar marcador: ${error.message}`);
            Toast.show({
                type: 'error',
                text1: 'Não foi possível atualizar marcador',
            });
        }
    }

    static async deleteMarker(id: number) {
        try {
            await MarkerService.delete(id);
        } catch (error: any) {
            console.log(`Erro ao deletar marcador: ${error.message}`);
            Toast.show({
                type: 'error',
                text1: 'Não foi possível excluir marcador',
            });
        }
    }
}
