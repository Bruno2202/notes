import { theme } from "@/theme";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

interface NotFoundCatProps {
    text?: string;
    subtext?: string;
}

export default function NotFoundCat({ text, subtext }: NotFoundCatProps) {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/images/cat.png')}
                style={styles.notFoundCat}	
            />
            <Text style={styles.text}>
                {text}
            </Text>
            <Text style={{...styles.text, fontSize: 12}}>
                {subtext}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        opacity: 0.6,
        alignItems: 'center',
        top: 80,
        flex: 1,
    },
    text: {
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorGrey,
        
        textAlign: 'center',
    },
	notFoundCat: {
		width: 160,
		height: 160,
	}
});
