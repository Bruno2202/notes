import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { NoteModel } from "../app/core/models/NoteModel";
import { MarkerModel } from "../app/core/models/MarkerModel";
import { UserContext } from "./UserContext";
import { MarkerController } from "../app/core/controllers/MarkerController";

interface UserProviderProps {
    children: ReactNode;
}

export interface NoteContextType {
    noteOptionsVisible: boolean;
    setNoteOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    note: NoteModel | null;
    setNote: React.Dispatch<React.SetStateAction<NoteModel | null>>;
    notes: NoteModel[];
    setNotes: React.Dispatch<React.SetStateAction<NoteModel[]>>;
    markers: MarkerModel[];
    setMarkers: React.Dispatch<React.SetStateAction<MarkerModel[]>>;
    notesCounter: number;
    setNotesCounter: React.Dispatch<React.SetStateAction<number>>;
    sharedNotes: NoteModel[];
    setSharedNotes: React.Dispatch<React.SetStateAction<NoteModel[]>>;
}

export const NoteContext = createContext<NoteContextType | null>(null);

export default function NotesProvider({ children }: UserProviderProps) {
    const [noteOptionsVisible, setNoteOptionsVisible] = useState<boolean>(false);
    const [note, setNote] = useState<NoteModel | null>(null);
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [markers, setMarkers] = useState<MarkerModel[]>([]);
    const [notesCounter, setNotesCounter] = useState<number>(0);
    const [sharedNotes, setSharedNotes] = useState<NoteModel[]>([]);

    const { userData, token } = useContext(UserContext) ?? { userData: null, token: undefined };

    useEffect(() => {
        fetchMarkers();
    }, [userData]);

    useEffect(() => {
        getNotesCounter();
    }, [notes]);

    async function fetchMarkers() {
        if (userData) {
            setMarkers(await MarkerController.fetchMarkers(token!, userData));
        }
    }

    async function getNotesCounter() {
        if (userData) {
            setNotesCounter(notes.length);
        }
    }

    return (
        <NoteContext.Provider
            value={{
                noteOptionsVisible,
                setNoteOptionsVisible,
                note,
                setNote,
                notes,
                setNotes,
                markers,
                setMarkers,
                notesCounter,
                setNotesCounter,
                sharedNotes,
                setSharedNotes
            }}
        >
            {children}
        </NoteContext.Provider>
    );
} 