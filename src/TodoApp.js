import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Provider } from 'react-redux';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import store from './store';

import * as socket from './services/socket';

export default class TodoApp extends React.Component {   
    render() {
        socket.login('3D6ED84113EF4966B89E79073740300B');
        return (
            <Provider store={store} >

                <View style={style.brand}>
                    <Image
                        style={style.tinyLogo}
                        source={{
                        uri: 'https://messenger-hom.gelt.com.br/assets/img/brand/blue.png',
                        }}
                    />    
                </View>            
                <View style={style.container}>                    
                    <TodoList />
                    
                </View>
                <View style={style.form}>
                    <TodoForm />
                </View>
            </Provider>
        )
    }
}

const style = StyleSheet.create(
    {
        container: {
            flex: 4,
            paddingTop: 20,            
        },
        brand: {
            flex: 1,
            alignItems: 'center',            
        },
        tinyLogo: {
            marginTop: 25,
            //marginLeft: '23%',
            width: 200,
            height: 49,
        },
        form: {
            //flex: 1,
        },
    }
)