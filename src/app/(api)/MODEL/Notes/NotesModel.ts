export abstract class NotesModel {
    private id?: number;
    private userId: number;
    private color: string;

    constructor(userId: number, color: string, id?: number) {
        this.userId = userId;
        this.color = color;
        this.id = id;
    }
}