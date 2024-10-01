import { theme } from "@/theme";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundCat() {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/images/cat.png')}
                style={styles.notFoundCat}	
            />
            <Text style={styles.text}>
                Parece que alguém lembra tudo de cabeça!
            </Text>
            <Text style={{...styles.text, fontSize: 12}}>
                (Você não possui notas)
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        opacity: 0.6,
        alignItems: 'center',
        top: 40,
        flex: 1,
    },
    text: {
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorGrey,
        textAlign: 'center',
    },
	notFoundCat: {
		width: 200,
		height: 200,
	}
});
