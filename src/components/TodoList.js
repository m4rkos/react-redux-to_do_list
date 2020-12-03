import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import TodoListItem from './TodoListItem';

const TodoList = ({ todos }) => (
    <View>
        {todos.map(todo=><TodoListItem key={todo.id} todo={todo}/>)}
    </View>
);

const style = StyleSheet.create({

})

const mapStateToProps = state =>{
    const { todos } = state;
    return { todos };
}

export default connect(mapStateToProps, null)(TodoList);