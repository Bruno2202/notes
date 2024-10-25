import { Text, View, StyleSheet, FlatList } from "react-native";
import { useCallback, useContext, useEffect } from "react";
import { router, useFocusEffect } from "expo-router";

import { theme } from "@/theme";
import { UserContext } from "@/src/contexts/UserContext";
import { NoteContext } from "@/src/contexts/NoteContext";
import { NoteController } from "../../core/controllers/NoteController";

import SearchBar from "@/src/components/SearchBar";
import NotePreview from "@/src/components/NotePreview";
import NotFoundCat from "@/src/components/NotFoundCat";
import Button from "@/src/components/Button";
import { NoteModel } from "../../core/models/NoteModel";

export default function Index() {
	const { userData, setUserData } = useContext(UserContext) ?? { userData: null, setUserData: () => { } };
	const { note, setNote, notes, setNotes } = useContext(NoteContext) ?? {
		note: null,
		setNote: () => { },
		notes: [],
		setNotes: () => { },
	};

	useFocusEffect(
		useCallback(() => {
			if (userData && note) {
				if (note.getTitle || note.getContent) {
					if (note.getId) {
						NoteController.updateNote(note);
					} else {
						NoteController.createNote(userData, note);
					}
					setNote(null);
				}

				fetchNotes();
			} else if (userData) {
				fetchNotes();
			}
		}, [note, userData])
	);
	
	async function fetchNotes() {
		const notes: NoteModel[] = await NoteController.fetchNotes(userData!);
		setNotes(notes);
	}

	return (
		<View style={styles.container}>
			<View style={styles.saluation}>
				{userData &&
					<Text style={styles.saluationText}>
						Olá,
						{"\n"}
						{userData.getName}
					</Text>
				}
			</View>
			<View style={styles.searchBarContainer}>
				<SearchBar />
			</View>
			{notes.length > 0 ? (
				<FlatList
					data={notes}
					style={styles.notesContainer}
					keyExtractor={(item) => item.getId!.toString()}
					renderItem={({ item }) => {
						if (item) {
							return (
								<NotePreview
									noteData={item}
								/>
							);
						} else {
							return <></>;
						}
					}}
					contentContainerStyle={{ paddingBottom: 120 }}
				/>
			) : (
				<NotFoundCat 
					text="Parece que alguém lembra tudo de cabeça!"
					subtext="(Você não possui notas)"
				/>
			)}
		</View>
	);
}  

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colorBlack,
	},
	saluation: {
		paddingHorizontal: theme.paddingHorizontal,
	},
	searchBarContainer: {
		paddingHorizontal: theme.paddingHorizontal,
		marginTop: 20,
		marginBottom: 40,
	},
	saluationText: {
		color: theme.colorWhite,
		fontFamily: 'fontFamilySemiBold',
		fontSize: 40,
	},
	notesContainer: {
		paddingHorizontal: theme.paddingHorizontal,
		width: '100%',
	},
});