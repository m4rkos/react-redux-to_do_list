import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

const TodoListItem = ({ todo, onPressTodo, onLongPressTodo }) => {		    
	return (
		<TouchableOpacity 
			onPress={() => {onPressTodo()} }
			onLongPress={()=>{onLongPressTodo()}}
			>
			<View style={styles.line}>				
				<Text style={[					
					todo.done ? styles.lineThough : styles.normal, 					
					todo.key_from_me == 2 ? styles.msg_me : styles.msg_to,					
					]}>
					<Icon name="check" size={20} color="#000" /> { todo.text}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	
	msg_me: {
		minHeight: 55,			
		padding: 12,		
		borderRadius: 10,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 5,
		alignSelf: 'flex-end',
		alignItems: 'flex-end',
		alignContent: 'flex-end',		
		backgroundColor: '#f1f1f1',
	},
	msg_to: {
		minHeight: 55,			
		padding: 12,		
		borderRadius: 10,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 5,
		alignSelf: 'flex-start',
		alignItems: 'flex-start',
		alignContent: 'flex-start',		
		backgroundColor: '#dcf8c6',
	},
	normal: {
		color: '#111',
	},
	lineText: {
		fontSize: 20,
		paddingLeft: 15,
		//flex: 7
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