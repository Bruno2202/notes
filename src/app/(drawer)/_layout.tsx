import Separator from '@/src/components/Separator';
import { NoteContext } from '@/src/contexts/NoteContext';
import { theme } from '@/theme';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { ReactNode, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useSegments } from 'expo-router';
import TabBarGradient from '@/src/components/TabBarGradient';
import { useNavigationState } from '@react-navigation/native';

function DrawerContent() {
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

            {markers && markers.map((item, index) => (
                <DrawerItem
                    key={index}
                    inactiveTintColor={theme.colorGrey}
                    label={item.getDescription}
                    activeTintColor={theme.colorWhite}
                    onPress={() => console.log(item)}
                    icon={({ color, size }) => (
                        <MaterialIcons
                            name="label"
                            size={size}
                            color={color}
                        />
                    )}
                    labelStyle={{
                        marginLeft: -20,
                        fontFamily: 'fontFamilyRegular',
                        fontSize: 16,
                        color: theme.colorGrey,
                    }}
                />
            ))}

            <DrawerItem
                inactiveTintColor={theme.colorGrey}
                label={"Criar marcador"}
                activeTintColor={theme.colorWhite}
                onPress={() => router.navigate('/(notes)/marker')}
                icon={({ color, size }) => (
                    <MaterialIcons
                        name="add"
                        size={size}
                        color={color}
                    />
                )}
                labelStyle={{
                    marginLeft: -20,
                    fontFamily: 'fontFamilyRegular',
                    fontSize: 16,
                    color: theme.colorGrey,
                }}
            />
        </DrawerContentScrollView>
    );
}

export default function Layout() {
    const segments = useSegments();
    const isDrawerDisabled = 
        JSON.stringify(segments) === JSON.stringify(["(drawer)", "(tabs)"]) ||
        JSON.stringify(segments) === JSON.stringify(["(notes)", "marker"]) ||
        JSON.stringify(segments) === JSON.stringify(["(notes)", "note"]) 

    return (
        <GestureHandlerRootView style={{ backgroundColor: theme.colorBlack, flex: 1 }}>
            <Drawer
                drawerContent={() => <DrawerContent />}
                screenOptions={{
                    swipeEdgeWidth: 400,
                    headerTintColor: theme.colorWhite,
                    drawerStyle: {
                        backgroundColor: theme.colorDarkGrey,
                        width: 240,
                    },
                    drawerActiveTintColor: theme.colorBlue,
                    drawerInactiveTintColor: theme.colorGrey,
                    headerStyle: {
                        backgroundColor: theme.colorBlack,
                        shadowColor: 'transparent',
                    },
                    title: '',
                    headerShown: isDrawerDisabled,
                    swipeEnabled: isDrawerDisabled
                }}
            >
                <Drawer.Screen
                    name='(tabs)'
                    options={{
                        drawerType: 'slide',
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
        marginVertical: 12,
        marginHorizontal: 20
    },
    headerTitle: {
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorWhite,
        fontSize: 32,
    },
    headerText: {
        color: theme.colorWhite,
        fontSize: 20,
    },
    separatorContainer: {
        marginVertical: 12,
    },
    markersContainer: {
        marginHorizontal: 20,
        marginBottom: 12,
    },
    tilte: {
        fontFamily: 'fontFamilySemiBold',
        color: theme.colorWhite,
        fontSize: 16,
    },
});