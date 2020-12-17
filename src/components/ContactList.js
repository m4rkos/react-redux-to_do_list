import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import ContactListItem from './ContactListItem';
import { toggleTodo, setEditingTodo, resetTodo } from '../actions';

import { useNavigation } from '@react-navigation/native';
//import { getMessagesByChatList } from '../model/storage';

const ContactList = ({ users, dispatchToggleTodo, dispatchSetEditingTodo, dispatchResetTodo, user_id }) => {
    
    const scrollViewRef = useRef();
    const navigation = useNavigation();
        
    return(
        <View>        
            <FlatList                 
                ref={scrollViewRef}
                data={users}
                renderItem={({ item: user, index: id }) => 
                    <ContactListItem 
                        key={user.token}
                        data={user}
                        onPressTodo={() => navigation.navigate('Messenger', { 
                            token: user.token, 
                            name: user.name, 
                            id: id, 
                            user_token: user_id 
                        })}
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
)(ContactList);