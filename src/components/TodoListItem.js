import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const TodoListItem = ({ todo, onPressTodo }) => {		    
	return (
		<TouchableOpacity onPress={() => {onPressTodo()} }>
			<View style={styles.line}>				
				<Text style={[
					styles.lineText,
					todo.done ? styles.lineThough : null
					]}>
					{ todo.text } { todo.done ? 1 : 2 }
				</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	line: {
		minHeight: 60,
		borderBottomWidth: 1,
		borderBottomColor: "#bbb",

		alignItems: 'center',
		flexDirection: 'row',
	},
	lineText: {
		fontSize: 20,
		paddingLeft: 15,
		flex: 7
	},
	lineThough: {
		textDecorationLine: 'line-through',
	},
	avatar: {
		aspectRatio: 1,
		flex: 1,

		marginLeft: 15,
		borderRadius: 50
	}
});

export default TodoListItem;