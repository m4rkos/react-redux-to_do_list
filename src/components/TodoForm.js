import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';

import { addTodo, setTodoText, updateTodo } from '../actions';
import Input from './Input';

import { pushMsg, makeId } from '../services/socket';

class TodoForm extends React.Component {
    
    onChangeText(text){
        //const { todo } = this.props;
        //if(todo.key_from_me == 2){
        this.props.dispatchSetTodoText(text);        
        //}        
    }

    onPress(){        
        const { todo } = this.props;
        
        if(todo.id) // && todo.key_from_me == 2
            return this.props.dispatchUpdateTodo(todo);
        
        if( todo.text != '' ){
            let token = makeId();
            this.props.dispatchAddTodo(todo.text, 2, token);              
            pushMsg('359C28FD1E1140FCB335593FD19DEF6B', todo.text, token)

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
                        onPress={()=> this.onPress()}
                        >
                        <Text style={styles.text_white}>
                            {id ? "Save": "Add"}
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

// Currying
// (mapStateToProps, mapDispatchToProps) (function)

// const mapDispatchToProps = dispatch =>{
//     return {
//         dispatchAddTodo: text => dispatch(addTodo(text))
//     }
// }

// const mapDispatchToProps = {
//     dispatchAddTodo: addTodo
// }

// export default connect(null, mapDispatchToProps)(TodoForm);

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