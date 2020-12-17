import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Thumbnail } from 'native-base';

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

const ContactListItem = ({ data, onPressTodo }) => {		    
	
	// const Ack = (ack) =>{
	// 	switch (parseInt(ack)) {
	// 		case 1:
	// 			return(<Icon name="check" size={20} color="#000" style={styles.check} />);
	// 		case 2:
	// 			return(<Icon name="done-all" size={20} color="#000" style={styles.check} />);
	// 		case 3:
	// 			return(<Icon name="done-all" size={20} color="#5297ff" style={styles.check} />);
		
	// 		default:
	// 			return(<Icon name="schedule" size={20} color="#000" style={styles.check} />);
	// 	}		
	// }

	return (
		<TouchableOpacity onPress={ () => { onPressTodo() } } >
			<View style={styles.listContainer}>
				<View style={styles.imageContainer}>
					<Thumbnail circular source={{ uri: `https://messenger.talkall.com.br/profiles/${data.token}.jpeg` }} />
				</View>
				<View style={styles.nameContainer}>
					<Text>{ data.name} </Text>
					{/* <Text note numberOfLines={1}>Its time to build a difference . .</Text> */}
				</View>
				<View style={styles.goIconContainer}>
					<Icon name="arrow-forward" size={20} color="#000" />					
				</View>
			</View>			
		</TouchableOpacity>
	);
}

/*

<View style={styles.line}>		
	<View >
		<Thumbnail circular source={
            { 
            	uri: `https://messenger.talkall.com.br/profiles/${data.token}.jpeg` 
            }
        } />
		<Text style={ styles.normal } >
			{ data.name} 
		</Text>								
	</View>				
</View>

*/

const styles = StyleSheet.create({

	listContainer: {
		flexDirection: 'row',
		paddingStart: 15,
		paddingEnd: 15,
		paddingTop: 10,
		paddingBottom: 10,		
		backgroundColor: 'rgba(255,255,255,0.3)',
		        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 0.5,
		// borderBottomWidth: 1,
		// borderBottomColor: '#f1f1f1',
	},	
	imageContainer: {
		flex: 1,
		alignSelf: 'stretch',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	nameContainer: {
		flex: 3,
		alignSelf: 'stretch',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	goIconContainer: {
		flex: 1,
		alignSelf: 'stretch',
		alignItems: 'flex-end',
		justifyContent: 'center',
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

export default ContactListItem;