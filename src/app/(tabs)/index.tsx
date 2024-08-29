import { Text, View, StyleSheet } from "react-native";
import { useContext } from "react";
import { Image } from "expo-image";

import { theme } from "@/theme";
import { UserContext } from "@/src/contexts/UserContext";
import SearchBar from "@/src/components/SearchBar";

export default function Index() {
    const { userData, setUserData } = useContext(UserContext) ?? { userData: null, setUserData: () => {} };

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
			<SearchBar />
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
		marginTop: 40,
		marginBottom: 20,
	},
	saluationText: {
		color: theme.colorWhite,
		fontFamily: 'fontFamilySemiBold',
		fontSize: 40,
	},
});