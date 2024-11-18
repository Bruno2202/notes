import { Text, View, StyleSheet, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";

import { theme } from "@/theme";
import { UserContext } from "@/src/contexts/UserContext";
import { NoteContext } from "@/src/contexts/NoteContext";
import { MaterialIcons } from "@expo/vector-icons";

import SearchBar from "@/src/components/SearchBar";
import NotePreview from "@/src/components/NotePreview";
import NotFoundCat from "@/src/components/NotFoundCat";
import { ModalContext } from "@/src/contexts/ModalContext";
import { NoteController } from "../../core/controllers/NoteController";
import { NoteModel } from "../../core/models/NoteModel";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filteredNotes, setFilteredNotes] = useState<NoteModel[]>([]);

	const { filterIsVisible, setFilterIsVisible } = useContext(ModalContext)!
	const { note, setNote, notes, setNotes } = useContext(NoteContext)!
	const { userData, token } = useContext(UserContext)!

	useEffect(() => {
		function searchNotesByName() {
			const fNotes: NoteModel[] = notes.filter(note => note.getTitle!.toLowerCase().includes(searchTerm.toLowerCase()));
			setFilteredNotes(fNotes);
		}

		searchNotesByName();
	}, [searchTerm]);

	useFocusEffect(
		useCallback(() => {
			if (userData && note) {
				if (note.getTitle || note.getContent) {
					if (note.getId) {
						NoteController.updateNote(token!, note);
					} else {
						NoteController.createNote(token!, userData, note);
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
		const notes: NoteModel[] = await NoteController.fetchNotes(token!, userData!);
		setNotes(notes);
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<KeyboardAvoidingView
				style={[styles.container]}
				behavior={"padding"}
			>
				<Animated.View
					entering={FadeInLeft}
					exiting={FadeOutLeft}
					style={[styles.saluation]}
				>
					{userData &&
						<Text style={styles.saluationText}>
							Olá,
							{"\n"}
							{userData.getName}
						</Text>
					}
				</Animated.View>
				<View style={styles.searchBarContainer}>
					<SearchBar
						onChangeTerm={setSearchTerm}
					/>
					<TouchableOpacity activeOpacity={0.6} onPress={() => {
						setFilterIsVisible(!filterIsVisible);
					}}>
						<MaterialIcons name="filter-list" color={theme.colorWhite} size={24} />
					</TouchableOpacity>
				</View>

				{notes.length > 0 ? (
					<Animated.FlatList
						data={searchTerm != "" ? filteredNotes : notes}
						style={[styles.notesContainer]}
						keyExtractor={(item) => item.getId!.toString()}
						renderItem={({ item }) => {
							if (item) {
								return (
									<NotePreview
										noteData={item}
									/>
								);
							} else {
								return (
									<></>
								)
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
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colorBlack,
	},
	saluation: {
		paddingHorizontal: theme.paddingHorizontal,
		height: 'auto',
		maxHeight: 120,
	},
	searchBarContainer: {
		paddingHorizontal: theme.paddingHorizontal,
		alignItems: "flex-end",
		marginTop: 20,
		marginBottom: 20,
		gap: 12,
	},
	saluationText: {
		color: theme.colorWhite,
		fontFamily: 'fontFamilySemiBold',
		fontSize: 40,
	},
	notesContainer: {
		paddingHorizontal: theme.paddingHorizontal,
		width: '100%',
		height: 10000
	},
});