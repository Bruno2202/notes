import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PropsWithChildren, useContext } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { theme } from '@/theme';
import Separator from './Separator';
import OpacityOverlay from './OpacityOverlay';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { NoteModel } from '../app/core/models/NoteModel';
import { NoteContext } from '../contexts/NoteContext';
import { ModalContext } from '../contexts/ModalContext';

type Props = PropsWithChildren<{
	title: string;
	isVisible: boolean;
	onClose: () => void;
}>;

export default function BottomModal({ title, isVisible, onClose }: Props) {
	const { notes, setNotes } = useContext(NoteContext)!
	const { filterIsVisible } = useContext(ModalContext)!

	function sortNotesAscending() {
		const ascendingNotes: NoteModel[] = notes.sort(
			(a: NoteModel, b: NoteModel) =>
				new Date(a.getCreationDate).getTime() - new Date(b.getCreationDate).getTime()
		);
		setNotes([...ascendingNotes]);
	}

	function sortNotesDescending() {
		const descendingNotes: NoteModel[] = notes.sort(
			(a: NoteModel, b: NoteModel) =>
				new Date(b.getCreationDate).getTime() - new Date(a.getCreationDate).getTime()
		);
		setNotes([...descendingNotes]);
	}

	return (
		filterIsVisible && (
			<>
				<Animated.View entering={SlideInDown} exiting={SlideOutDown} style={styles.modalContent}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>{title}</Text>
						<TouchableOpacity activeOpacity={0.6} onPress={onClose}>
							<MaterialIcons name="close" color="#fff" size={24} />
						</TouchableOpacity>
					</View>
					<Separator />
					<View style={styles.optionContainer}>
						<TouchableOpacity onPress={() => sortNotesAscending()}>
							<Text style={styles.modalTextOpiton}>Data Crescente</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => sortNotesDescending()}>
							<Text style={styles.modalTextOpiton}>Data Decrescente</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
				<OpacityOverlay onPress={onClose} />
			</>
		)
	);
}

const styles = StyleSheet.create({
	modalContent: {
		zIndex: 2,
		height: '25%',
		width: '100%',
		backgroundColor: theme.colorDarkGrey,
		borderTopRightRadius: 18,
		borderTopLeftRadius: 18,
		position: 'absolute',
		bottom: 0,
	},
	titleContainer: {
		backgroundColor: theme.colorDarkGrey,
		borderTopRightRadius: 8,
		borderTopLeftRadius: 8,
		paddingHorizontal: 20,
		paddingVertical: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		fontFamily: 'fontFamilySemiBold',
		color: theme.colorWhite,
		fontSize: 16,
	},
	modalTextOpiton: {
		fontFamily: 'fontFamilySemiBold',
		color: theme.colorGrey,
		fontSize: 16,
		backgroundColor: theme.colorMediumGrey,
		padding: 8,
		borderRadius: 8,
	},
	optionContainer: {
		gap: 20,
		padding: 20,
		flex: 1,
		justifyContent: 'center',
	}
});
