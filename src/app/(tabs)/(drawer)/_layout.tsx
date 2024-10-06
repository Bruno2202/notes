import Separator from '@/src/components/Separator';
import { NoteContext } from '@/src/contexts/NoteContext';
import { theme } from '@/theme';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function CustomDrawerContent() {
    const { markers, setMarkers } = useContext(NoteContext) ?? {
        markers: null,
        setMarkers: () => { },
    };

    return (
        <DrawerContentScrollView
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notes</Text>
            </View>

            <View style={styles.separatorContainer}>
                <Separator />
            </View>

            <View style={styles.markersContainer}>
                <Text style={styles.tilte}>Marcadores</Text>
            </View>
            <FlatList
                data={markers}
                renderItem={({ item }) => {
                    if (item) {
                        return (
                            <DrawerItem
                                label="MARCADOR"
                                onPress={() => console.log()}
                            />
                        );
                    } else {
                        return null;
                    }
                }}
            />
        </DrawerContentScrollView>
    );
}

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ backgroundColor: theme.colorBlack, flex: 1 }}>
            <Drawer
                drawerContent={() => <CustomDrawerContent />}
                screenOptions={{
                    swipeEdgeWidth: 400,
                    headerTintColor: theme.colorWhite,
                    drawerStyle: {
                        backgroundColor: theme.colorDarkGrey,
                        width: 240,
                        zIndex: 999
                    },
                    drawerLabelStyle: {
                        color: '#fff',
                    },
                    drawerActiveTintColor: theme.colorBlue,
                    drawerInactiveTintColor: '#aaa',
                }}
            >
                <Drawer.Screen
                    name="index"
                    options={{
                        headerStyle: {
                            backgroundColor: theme.colorBlack,
                            shadowColor: 'transparent',
                        },
                        drawerLabel: 'Home',
                        title: '',
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>

    );
}

const styles = StyleSheet.create({
    container: {
    },
    header: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    headerTitle: {
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorWhite,
        fontSize: 24,
    },
    headerText: {
        color: theme.colorWhite,
        fontSize: 20,
    },
    separatorContainer: {
        marginVertical: 12,
    },
    markersContainer: {
        marginHorizontal: 8,
        marginBottom: 12,
    },
    tilte: {
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorWhite,
        fontSize: 12,
    },
});
