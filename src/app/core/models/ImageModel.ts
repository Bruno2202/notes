import * as ImagePicker from 'expo-image-picker';

export class ImageModel {
    static async getBase64FromImage(blob: Blob): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = (reader.result as string).split(",")[1];
                resolve(base64String);
            };
            reader.onerror = (error) => {
                console.error("Erro ao converter imagem para base64:", error);
                reject(error);
            };
            reader.readAsDataURL(blob);
        });
    }

    static async getBlobFromImage(uri: string): Promise<Blob> {
        try {
            const response = await fetch(uri);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return await response.blob();
        } catch (error) {
            console.error('Erro ao obter o Blob da imagem:', error);
            throw error;
        }
    }

    static async pickImage(): Promise<string | null> {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri;

                const blob = await this.getBlobFromImage(uri);
                const base64Image = await this.getBase64FromImage(blob);

                return base64Image;
            }

            return null;
        } catch (error) {
            console.error("Erro ao selecionar imagem:", error);
            return null;
        }
    }
}
