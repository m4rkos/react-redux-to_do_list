import { 
    SET_TODO_TEXT,
    ADD_TODO,
    UPDATE_TODO,
    SET_EDITING_TODO,
    ACK_TODO,
    RESET_TODO
} from '../actions';

const INITIAL_STATE = {
    id: null,
    text: '',
    done: false,
    key_from_me: 2,
    token_msg: '',
    ack: 1,
    ct: null,
    media_caption: null, 
    media_title: null, 
    media_mime_type: 1, 
    media_url: null
};

const editingTodoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_TODO_TEXT:              
            return {
                ...state, 
                text: action.text
            };
            
        case ADD_TODO:
        case UPDATE_TODO:
        case ACK_TODO:
        case RESET_TODO:
            return INITIAL_STATE;

        case SET_EDITING_TODO:
            return action.todo;
    
        default:
            return state;
    }
}

export default editingTodoReducer;