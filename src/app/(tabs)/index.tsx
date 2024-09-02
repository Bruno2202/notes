import { Text, View, StyleSheet, FlatList, ScrollView } from "react-native";
import { useContext } from "react";
import { Image } from "expo-image";

import { theme } from "@/theme";
import { UserContext } from "@/src/contexts/UserContext";
import SearchBar from "@/src/components/SearchBar";
import AddNote from "@/src/components/AddNote";
import NotePreview from "@/src/components/NotePreview";
import { Href, router } from "expo-router";

export default function Index() {
	const { userData, setUserData } = useContext(UserContext) ?? { userData: null, setUserData: () => { } };

	function navigation(route: Href) {
		router.navigate(route);
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
				<Image source={require('../../../assets/images/cat.png')} />
			</View>
			<View style={styles.searchBarContainer}>
				<SearchBar />
			</View>
			{/* <FlatList
				style={styles.notesContainer}
				renderItem={() => {
				data={[]}
					<NotePreview />
				}}
			/> */}
			<AddNote onPress={() => navigation('(notes)')}/>
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