import { Text, View, StyleSheet, FlatList, ScrollView } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { Image } from "expo-image";
import { Href, router, useFocusEffect } from "expo-router";

import { theme } from "@/theme";
import { UserContext } from "@/src/contexts/UserContext";
import { NoteContext } from "@/src/contexts/NoteContext";
import { NoteService } from "../core/services/NoteService";
import { NoteModel } from "../core/models/NoteModel";

import SearchBar from "@/src/components/SearchBar";
import AddNote from "@/src/components/AddNote";
import NotePreview from "@/src/components/NotePreview";
import Toast from "react-native-toast-message";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { NoteController } from "../core/controllers/NoteController";

export default function Index() {
	const { userData, setUserData } = useContext(UserContext) ?? { userData: null, setUserData: () => { } };
	const { note, setNote } = useContext(NoteContext) ?? {
		note: null,
		setNote: () => { }
	};

	const [notes, setNotes] = useState<NoteModel[] | null>(null);

	// Salvamento de nota após foco da tela
	useFocusEffect(
		useCallback(() => {
			if (note) {
				if (note.getTitle != "" || note.getContent != "") {
					if (note?.getId) {
						NoteController.updateNote(note);
						setNote(null);
						fetchNotes();

						return;
					}
					
					NoteController.createNote(userData!, note);
					setNote(null);
				}
			}

			fetchNotes();
		}, [note, userData])
	);

	// Buscar notas após acessar tela
	useEffect(() => {
		if (userData) {
			fetchNotes();
		}
	}, [userData]);

	function navigation(route: Href) {
		router.navigate(route);
	}

	async function fetchNotes() {
		const notes = await NoteController.fetchNotes(userData!);
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
						return null;
					}
				}}
			/>
			<AddNote onPress={() => navigation('/(notes)')} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: theme.paddingHorizontal,
		flex: 1,
		backgroundColor: theme.colorBlack,
		marginTop: theme.statusBarHeight,
	},
	saluation: {
		marginTop: 60,
	},
	searchBarContainer: {
		marginTop: 20,
		marginBottom: 40,
	},
	saluationText: {
		color: theme.colorWhite,
		fontFamily: 'fontFamilySemiBold',
		fontSize: 40,
	},
	notesContainer: {
		width: '100%',
	}
});