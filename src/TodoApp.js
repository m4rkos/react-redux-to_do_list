import React from 'react';
import { Text, View, StyleSheet, Image, StatusBar } from 'react-native';
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

                <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
                <View style={style.brand}>
                    <Image
                        style={style.tinyLogo}
                        source={
                            require('../assets/images/talkall_logo_color.png')
                        }
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
            backgroundColor: '#f1f1f1',
            paddingTop: 10,
            paddingBottom: 5,
        },
    }
)