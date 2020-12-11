import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import { addTodo, setTodoText, updateTodo } from '../actions';
import Input from './Input';

import { pushMsg, makeId } from '../services/socket';
import { FormatShortTime } from '../services/formatDate';
import { setMessagesByChatList } from '../model/storage';

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

class TodoForm extends React.Component {
    
    onChangeText(text){        
        this.props.dispatchSetTodoText(text);                
    }

    onPress(){        
        const { todo } = this.props;

        Keyboard.dismiss();

        if(todo.id)
            return this.props.dispatchUpdateTodo(todo);
        
        if( todo.text != '' ){
            let token = makeId();
            let ct = Math.floor(Date.now() / 1000);

            this.props.dispatchAddTodo(todo.text, 2, token, 0, FormatShortTime(ct));                          
            pushMsg(this.props.user_data.token, todo.text, token);

            let msgData = {
                talk_all_token_id: this.props.user_talkall,
                token: token,
                key_from_me: 2,
                key_remote_id: this.props.user_data.token,                
                msg: todo.text,
                status: 1,                
                ct: ct
            }
            setMessagesByChatList(msgData);

        }else{
            Alert.alert('Preencha o texto!!');
        }        
        
    }

    render() {
        const { text, id } = this.props.todo;
        return (
            <View style={styles.formContainer} >
                <View style={styles.inputContainer}>                
                    <Input 
                        onChangeText={text => this.onChangeText(text)}
                        value={text}                        
                    />
                </View>
                <View style={styles.buttonContainer}>                
                    <TouchableOpacity
                        style={[styles.btn,
                            id ? styles.saveBg : styles.addBg
                        ]}
                        onPress={()=> {this.onPress();}}
                        >
                        <Text style={styles.text_white}>
                            {id ? <Icon name="save" size={20} color="#fff" style={styles.check} /> : <Icon name="send" size={20} color="#fff" style={styles.check} />}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    saveBg: {
        backgroundColor: '#6c5ce7', 
    },
    addBg: {
        backgroundColor: '#0984e3', 
    },
    btn: {    
        marginRight: 10,               
        paddingTop: 18,
        paddingBottom: 18,
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
    text_white: {
        alignSelf: 'center',
        alignContent: 'stretch',
        color: '#fff',        
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    //Containers
    formContainer: {
        flexDirection: 'row',
    },
    inputContainer: {
        flex: 4,
    },
    buttonContainer: {
        flex: 1,
    },
})

const mapStateToProps = state =>{
    return {
        todo: state.editingTodo
    }
}

export default connect(mapStateToProps, {
    dispatchAddTodo: addTodo, 
    dispatchSetTodoText: setTodoText,
    dispatchUpdateTodo: updateTodo
})(TodoForm);