import React, { createContext, ReactNode, useEffect, useState } from "react";
import { NoteModel } from "../app/core/models/NoteModel";
import { MarkerModel } from "../app/core/models/MarkerModel";

interface UserProviderProps {
    children: ReactNode;
}

export interface NoteContextType {
    noteOptionsVisible: boolean;
    setNoteOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    note: NoteModel | null;
    setNote:  React.Dispatch<React.SetStateAction<NoteModel | null>>;
    notes: NoteModel[] | null;
    setNotes:  React.Dispatch<React.SetStateAction<NoteModel[] | null>>;
    markers: MarkerModel[] | null;
    setMarkers:  React.Dispatch<React.SetStateAction<MarkerModel[] | null>>;
}

export const NoteContext = createContext<NoteContextType | null>(null);

export default function NotesProvider({ children }: UserProviderProps) {
    const [noteOptionsVisible, setNoteOptionsVisible] = useState<boolean>(false);
    const [note, setNote] = useState<NoteModel | null>(null);
    const [notes, setNotes] = useState<NoteModel[] | null>(null);
    const [markers, setMarkers] = useState<MarkerModel[] | null>(null);

    return (
        <NoteContext.Provider value={{
            noteOptionsVisible,
            setNoteOptionsVisible,
            note,
            setNote,
            notes,
            setNotes,
            markers,
            setMarkers
        }}>
            {children}
        </NoteContext.Provider>
    );
} 