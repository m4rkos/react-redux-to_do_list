import { combineReducers } from 'redux';

import todoListReducer from './todoListReducer';
import editingTodoListReducer from './editingTodoReducer';

const rootReducer = combineReducers({
    todos: todoListReducer,
    editingTodo: editingTodoListReducer
});

export default rootReducer;