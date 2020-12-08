// Actions creator

export const ADD_TODO = 'ADD_TODO';
export const addTodo = (text, key_from_me = 2, token_msg, ack = 0, ct) => ({
    type: ADD_TODO,
    text: text,
    key_from_me: key_from_me,
    token_msg: token_msg,
    ack: ack,
    ct: ct
});

export const TOGGLE_TODO = 'TOGGLE_TODO';
export const toggleTodo = todoId => ({
    type: TOGGLE_TODO,
    todoId
});

export const SET_TODO_TEXT = 'SET_TODO_TEXT';
export const setTodoText = text => ({
    type: SET_TODO_TEXT,
    text
});

export const SET_EDITING_TODO = 'SET_EDITING_TODO';
export const setEditingTodo = todo => ({
    type: SET_EDITING_TODO,
    todo
});

export const UPDATE_TODO = 'UPDATE_TODO';
export const updateTodo = todo => ({
    type: UPDATE_TODO,
    todo
});

export const ACK_TODO = 'ACK_TODO';
export const updateAckTodo = (ack, token_msg) => ({
    type: ACK_TODO,
    ack: ack,
    token_msg: token_msg
});