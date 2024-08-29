import { Text, View, StyleSheet } from "react-native";
import { useContext } from "react";
import { Image } from "expo-image";

import { theme } from "@/theme";
import { UserContext } from "@/src/contexts/UserContext";
import SearchBar from "@/src/components/SearchBar";
import { TokenModel } from "../(api)/MODEL/TokenModel";
import Button from "@/src/components/Button";

export default function Index() {
    const { userData, setUserData } = useContext(UserContext) ?? { userData: null, setUserData: () => {} };

	// async function TesteToken() {
	// 	if (userData) {
	// 		// const token = TokenModel.generateToken(userData);
	// 		// console.log("TOKEN: " + token);
	
	// 		// await TokenModel.storeUserToken(token);
	
	// 		const tokenRecuperado = await TokenModel.getToken();
	// 		console.log("TOKEN RECUPERADO: " + tokenRecuperado);
	
	// 		if (tokenRecuperado) {
	// 			const tokenId: number | null = TokenModel.extractTokenData(tokenRecuperado);
	// 			if (tokenId !== null) {
	// 				console.log("ID do usuário extraído: " + tokenId);
	// 			} else {
	// 				console.log("Falha ao extrair o ID do token.");
	// 			}
	// 		}

	// 		// await TokenModel.removeToken();
	// 	}
	// }

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
				<Button text="Teste" onPress={() => TesteToken()}/>
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