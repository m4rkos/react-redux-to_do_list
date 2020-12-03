import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const TodoListItem = ({ todo, onPressTodo, onLongPressTodo }) => {		    
	return (
		<TouchableOpacity 
			onPress={() => {onPressTodo()} }
			onLongPress={()=>{onLongPressTodo()}}
			>
			<View style={styles.line}>				
				<Text style={[
					styles.lineText,
					todo.done ? styles.lineThough : styles.normal
					]}>
					{ todo.text }
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
	normal: {
		color: '#111',
	},
	lineText: {
		fontSize: 20,
		paddingLeft: 15,
		flex: 7
	},
	lineThough: {
		textDecorationLine: 'line-through',		
		color: '#eb4d4b',
	},
	avatar: {
		aspectRatio: 1,
		flex: 1,

		marginLeft: 15,
		borderRadius: 50
	}
});

export default TodoListItem;