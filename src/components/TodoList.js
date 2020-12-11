import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import TodoListItem from './TodoListItem';
import { toggleTodo, setEditingTodo, resetTodo } from '../actions';
import { getMessagesByChatList } from '../model/storage';

const TodoList = ({ todos, dispatchToggleTodo, dispatchSetEditingTodo, dispatchResetTodo, user_data }) => {
    
    const scrollViewRef = useRef();
    
    useEffect( () => {
        dispatchResetTodo([])
        getMessagesByChatList(user_data.token);
    }, [] );

    return(
        <View>        
            <FlatList                 
                ref={scrollViewRef}
                data={todos}
                renderItem={({ item: todo }) => 
                    <TodoListItem 
                        key={todo.id} 
                        todo={todo} 
                        onPressTodo={() => dispatchToggleTodo(todo.id)}
                        onLongPressTodo={() => dispatchSetEditingTodo(todo)}
                    />
                }
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated:true}) }                
            />
        </View>
    )
};

const style = StyleSheet.create({
    width: {
        width: 100,
    },
})

const mapStateToProps = state =>{
    const { todos } = state;
    return { todos };
}

export default connect(
    mapStateToProps, 
    { 
        dispatchToggleTodo: toggleTodo,
        dispatchSetEditingTodo: setEditingTodo,
        dispatchResetTodo: resetTodo
    } 
)(TodoList);