import React, { createContext, ReactNode, useState } from "react";
import { NoteModel } from "../app/core/models/NoteModel";

interface UserProviderProps {
    children: ReactNode;
}

interface NoteContextType {
    noteOptionsVisible: boolean;
    setNoteOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    note: NoteModel | null;
    setNote:  React.Dispatch<React.SetStateAction<NoteModel | null>>;
}

export const NoteContext = createContext<NoteContextType | null>(null);

export default function NotesProvider({ children }: UserProviderProps) {
    const [noteOptionsVisible, setNoteOptionsVisible] = useState<boolean>(false);
    const [note, setNote] = useState<NoteModel | null>(null);

    return (
        <NoteContext.Provider value={{
            noteOptionsVisible,
            setNoteOptionsVisible,
            note,
            setNote
        }}>
            {children}
        </NoteContext.Provider>
    );
} 