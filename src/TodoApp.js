import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Provider } from 'react-redux';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';


import * as socket from './services/socket';

import store from './store';

export default class TodoApp extends React.Component {   
    render() {
        socket.login('3D6ED84113EF4966B89E79073740300B');
        return (
            <Provider store={store} >
                <View style={style.container}>
                    <TodoForm />
                    <TodoList />
                </View>
            </Provider>
        )
    }
}

const style = StyleSheet.create(
    {
        container: {
            paddingTop: 30,
        },
    }
)