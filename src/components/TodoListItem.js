import React, {useState, useEffect} from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { Audio } from 'expo-av';

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

const TodoListItem = ({ todo, onPressTodo, onLongPressTodo }) => {		
	
	const [sound, setSound] = useState();
    const [playing, setPlaying] = useState(false);

	async function playSound(url) {        
        try {            
            const { sound } = await Audio.Sound.createAsync(
                {uri: `${url}`}
            );
            setSound(sound);            
            setPlaying(true);
            await sound.playAsync()            

        } catch (error) {            
            console.log('there are something wrong :( ');
        }        
	}
	
	async function pauseSound() {
		console.log('Pause Sound');		
        setPlaying(false);
        await sound.pauseAsync();
        //await sound.unloadAsync();
    }
    
    // useEffect(() => {
    //     return sound
    //     ? () => {
    //         console.log('Unloading Sound');
    //         sound.unloadAsync(); }
    //     : undefined;
    // }, [sound]);
	
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

	const messages = (todo) => {						
		switch (todo.media_mime_type) {
			case "3":
			case 3:				
				return (
					<View style={[ todo.key_from_me == 2 ? styles.msg_me : styles.msg_to ]}>
						<Image style={styles.image}
							source={{
								uri: todo.media_url
							}}
						/>
						<Text style={todo.key_from_me == 2 ? styles.time : styles.time2}>{todo.ct} </Text>{todo.key_from_me == 2 ? Ack(todo.ack) : null }
					</View>	
				)

			case "2":				
			case 2:								
				let media = todo.media_url;
				if(todo.media_url == ''){
					media = todo.text;
				} 
				return (
					<View style={[ todo.key_from_me == 2 ? styles.msg_me : styles.msg_to ]}>
						<TouchableOpacity 
						onPress={playing ? () => pauseSound() : () => playSound(todo.media_url)} 
						>
							<Text>
								<Icon name={playing ? "pause" : "play-arrow"} size={50} color="#ee5253" />
							</Text>
						</TouchableOpacity>
						<Text style={todo.key_from_me == 2 ? styles.time : styles.time2}>{todo.ct} </Text>{todo.key_from_me == 2 ? Ack(todo.ack) : null }
					</View>	
				)
		
			default:
				return (
					<View style={[ todo.key_from_me == 2 ? styles.msg_me : styles.msg_to ]}>
						<Text style={ todo.done ? styles.lineThough : styles.normal } >
							{ todo.text} 
						</Text>			
						<Text style={todo.key_from_me == 2 ? styles.time : styles.time2}>{todo.ct} </Text>{todo.key_from_me == 2 ? Ack(todo.ack) : null }
					</View>	
				)				
		}
	}

	return (
		<TouchableOpacity 			
			onPress={ todo.key_from_me == 2 ? () => { onPressTodo() } : null }
			onLongPress={ todo.key_from_me == 2 ? ()=>{ onLongPressTodo() } : null }
			>
			<View style={styles.line}>						
				{messages(todo)}	
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	image:{
		width: 280,
		height: 360,
	},	
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