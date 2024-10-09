import { StyleSheet, View } from "react-native";

import { theme } from "@/theme";

interface PropTypes {
    marginVertical?: number;
}

export default function Separator({ marginVertical }: PropTypes) {
    return <View style={{...styles.separator, marginVertical}}></View>;
}

const styles = StyleSheet.create({
    separator: {
        width: '100%',
        borderBottomColor: theme.colorGrey,
        borderBottomWidth: 1.6,
        opacity: 0.1,
    }
});
