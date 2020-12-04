import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({ onChangeText, value }) => (
    <TextInput 
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder="Digite aqui"
        //underlineColorAndroid="#000"
    />
);

const styles = StyleSheet.create({
    input: {
        marginLeft: 10,
        marginRight: 5,
        marginBottom: 10,
        paddingLeft: 15,
        paddingBottom: 15,
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
    }
});

export default Input;