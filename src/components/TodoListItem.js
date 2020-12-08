import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

const TodoListItem = ({ todo, onPressTodo, onLongPressTodo }) => {		    
	
	const Ack = (ack) =>{
		switch (parseInt(ack)) {
			case 1:
				return(<Icon name="check" size={20} color="#000" style={styles.check} />);
			case 2:
				return(<Icon name="done-all" size={20} color="#000" style={styles.check} />);
			case 3:
				return(<Icon name="done-all" size={20} color="#5297ff" style={styles.check} />);
		
			default:
				return(<Icon name="schedule" size={20} color="#000" style={styles.check} />);
		}		
	}

	return (
		<TouchableOpacity 
			onPress={ todo.key_from_me == 2 ? () => { onPressTodo() } : null }
			onLongPress={ todo.key_from_me == 2 ? ()=>{ onLongPressTodo() } : null }
			>
			<View style={styles.line}>		
				<View style={[ todo.key_from_me == 2 ? styles.msg_me : styles.msg_to ]}>
					<Text style={ todo.done ? styles.lineThough : styles.normal } >
						{ todo.text} 
					</Text>			
					<Text style={todo.key_from_me == 2 ? styles.time : styles.time2}>{todo.ct} </Text>{todo.key_from_me == 2 ? Ack(todo.ack) : null }
				</View>				
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
		position: 'relative',
	},
	lineText: {
		fontSize: 20,
		paddingLeft: 15,
		position: 'relative',
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
		borderRadius: 50,
	},
	check: {
		marginTop: 10,		
		position: 'absolute',			
		right: 10,
		bottom: 6,
	},
	time: {		
		alignSelf: 'flex-end',
		paddingEnd: 18,
		marginTop: 10,
		marginBottom: -6,		
	},
	time2: {		
		alignSelf: 'flex-end',
		paddingEnd: 0,
		marginTop: 10,
		marginBottom: -6,		
	},

});

export default TodoListItem;