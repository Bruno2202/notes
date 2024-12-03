import { Text, StyleSheet, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity, BackHandler } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { RefreshControl } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { Easing, FadeIn, FadeInLeft, FadeOutLeft, FadeOutUp, LinearTransition } from "react-native-reanimated";

import { theme } from "@/theme";
import { UserContext } from "@/src/contexts/UserContext";
import { NoteContext } from "@/src/contexts/NoteContext";
import { ModalContext } from "@/src/contexts/ModalContext";
import { AnimationContext } from "@/src/contexts/AnimationContext";
import { NoteController } from "../../core/controllers/NoteController";
import { NoteModel } from "../../core/models/NoteModel";

import SearchBar from "@/src/components/SearchBar";
import NotePreview from "@/src/components/NotePreview";
import NotFoundCat from "@/src/components/NotFoundCat";

export default function Index() {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filteredNotes, setFilteredNotes] = useState<NoteModel[]>([]);
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const { filterIsVisible, setFilterIsVisible } = useContext(ModalContext)!
	const { note, setNote, notes, setNotes, sharedNotes, setSharedNotes } = useContext(NoteContext)!
	const { userData, token } = useContext(UserContext)!
	const { welcomeIsVisible, setWelcomeIsVisible } = useContext(AnimationContext)!

	useEffect(() => {
		function searchNotesByName() {
			const fNotes: NoteModel[] = notes.filter(note =>
				note.getTitle && note.getTitle.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredNotes(fNotes);
		}

		searchNotesByName();
	}, [searchTerm]);

	useEffect(() => {
		if (welcomeIsVisible && userData) {
			const timer = setTimeout(() => {
				setWelcomeIsVisible(false);
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [userData]);

	useFocusEffect(
		useCallback(() => {
			const handleBackPress = () => {
				BackHandler.exitApp();
				return true;
			};

			const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

			return () => {
				subscription.remove();
			};
		}, [])
	);

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
		setNotes(await NoteController.fetchAllMergedNotes(token!, userData!));
	};

	async function refreshNotes() {
		setRefreshing(true);
		fetchNotes();
		setRefreshing(false);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<KeyboardAvoidingView
				style={[styles.container]}
				behavior={"padding"}
			>
				{welcomeIsVisible && (
					<Animated.View
						layout={LinearTransition}
						entering={FadeInLeft}
						exiting={FadeOutUp.duration(100)}
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
				)}
				<Animated.View
					layout={LinearTransition}
					style={styles.searchBarContainer}
				>
					<SearchBar
						onChangeTerm={setSearchTerm}
					/>
					<TouchableOpacity activeOpacity={0.6} onPress={() => {
						setFilterIsVisible(!filterIsVisible);
					}}>
						<MaterialIcons name="filter-list" color={theme.colorWhite} size={24} />
					</TouchableOpacity>
				</Animated.View>

				{notes.length > 0 ? (
					<Animated.FlatList
						entering={FadeInLeft}
						exiting={FadeOutLeft}
						removeClippedSubviews={true}
						layout={LinearTransition}
						itemLayoutAnimation={LinearTransition}
						refreshControl={
							<RefreshControl
								progressBackgroundColor={theme.colorBlack}
								colors={[theme.colorBlue]}
								refreshing={refreshing}
								onRefresh={refreshNotes}
							/>
						}
						data={searchTerm !== "" ? filteredNotes : notes}
						style={[styles.notesContainer]}
						keyExtractor={(item, index) => item.getId ? item.getId : `key-${index}`}
						renderItem={({ item }) => {
							if (item) {
								return (
									<NotePreview noteData={item} />
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
	},
});