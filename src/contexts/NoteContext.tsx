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
}

export const NoteContext = createContext<NoteContextType | null>(null);

export default function NotesProvider({ children }: UserProviderProps) {
    const [noteOptionsVisible, setNoteOptionsVisible] = useState<boolean>(false);
    const [note, setNote] = useState<NoteModel | null>(null);
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [markers, setMarkers] = useState<MarkerModel[]>([]);

    const { userData } = useContext(UserContext) ?? { userData: null, setUserData: () => { } };

    useEffect(() => {
        async function fetchMarkers() {
            if (userData) {
                setMarkers(await MarkerController.fetchMarkers(userData));
            }
        }

        fetchMarkers();
    }, [userData]);

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
                setMarkers
            }}
        >
            {children}
        </NoteContext.Provider>
    );
} 