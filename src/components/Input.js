import React, {useState} from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont();

const Input = ({ onChangeText, onPressIn, onPressOut, value, placeholder = 'Digite aqui', onPressTools, recording }) => {
        
    return(
        <View style={[styles.input, styles.formContainer]}>
            
            <Text style={styles.buttonContainer}>
                <Icon name="mood" size={20} color="#aaa" />
            </Text>
                    
            <TextInput             
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                style={styles.inputContainer}
            />
            
            <TouchableOpacity style={styles.buttonContainer}
                onPress={ ()=>{onPressTools()} }
                >
                <Text>
                    <Icon name="camera-alt" size={20} style={styles.icons} />
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}            
                onPress={ recording ? ()=>onPressOut() : ()=>onPressIn() } 
                //onPressIn={ ()=>{onPressIn()} }
                //onPressOut={ ()=>{onPressOut()} }
                >
                <Text>
                    <Icon name={ recording ? "stop": "mic"} size={20} style={styles.icons} />                    
                </Text>
            </TouchableOpacity>

            
        </View>
    )
};

const styles = StyleSheet.create({
    icons: {
        color: '#000',
    },
    input: {
        marginLeft: 10,
        marginRight: 0,
        marginBottom: 10,
        paddingLeft: 15,
        backgroundColor: '#fff',        
        borderRadius: 50,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    //Containers
    formContainer: {
        flexDirection: 'row',
    },
    inputContainer: {
        flex: 5,
        alignSelf: 'center',
        alignContent: 'stretch',                
    },
    buttonContainer: {
        flex: 1,
        alignSelf: 'center',
        alignContent: 'stretch',
    },
});

export default Input;