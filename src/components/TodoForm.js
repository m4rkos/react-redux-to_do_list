import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';

import { addTodo } from '../actions';
import Input from './Input';

class TodoForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: ''
        }
    }

    onChangeText(text){
        this.setState({ text });
    }

    onPress(){        
        if(this.state.text != ''){
            this.props.dispatchAddTodo(this.state.text);
            this.setState({text:''})
        }else{
            Alert.alert('Preencha o texto!!');
        }
    }

    render() {
        const { text } = this.state;
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
                        style={styles.btn}
                        onPress={()=> this.onPress()}
                        >
                        <Text style={styles.text_white}>click</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btn: {    
        backgroundColor: 'blue',        
        paddingTop: 15,
        paddingBottom: 15,
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

export default connect(null, {dispatchAddTodo: addTodo})(TodoForm);