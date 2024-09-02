import { NotesModel } from "./NotesModel";

export class TextNotesModel extends NotesModel {
    text: number;

    constructor(text: string) {
        super();
    }
}