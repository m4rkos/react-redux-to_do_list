import { ADD_TODO } from '../actions';
import { combineReducer } from 'redux';

const todoListReducer = (state = [], action) =>{
    switch (action.type) {
        case ADD_TODO:
            const newTodo = {
                text: action.text
            }
            return [...state, newTodo];
    
        default:
            return state;
    }
};

export default todoListReducer;