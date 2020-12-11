import { 
    ADD_TODO, 
    TOGGLE_TODO, 
    UPDATE_TODO,
    ACK_TODO,
    RESET_TODO
} from '../actions';

let nextId = 1;

const todoListReducer = (state = [], action) =>{
    switch (action.type) {
        case ADD_TODO:   
            console.log('___HERE___');;
            console.log(action);        
            const newTodo = {
                id: nextId++,
                text: action.text,
                done: false,
                key_from_me: action.key_from_me,
                token_msg: action.token_msg,
                ack: action.ack,
                ct: action.ct
            }
            return [...state, newTodo];

        case TOGGLE_TODO:            
            action.todoId;
            return state.map(todo => {
                if(todo.id === action.todoId)
                    return {
                        ...todo, 
                        done: !todo.done
                    }
                    //return Object.assign({}, todo, { done: !todo.done })
                return todo;
            });
        
        case ACK_TODO:                        
            action.token_msg;
            return state.map(todo => {
                if(todo.token_msg === action.token_msg)
                    return {
                        ...todo, 
                        ack: action.ack
                    }                    
                return todo;
            });

        case UPDATE_TODO:            
            return state.map(todo => {
                if(todo.id === action.todo.id){
                    return action.todo;
                }
                return todo;
            });

        case RESET_TODO:
            return [];

        default:
            return state;
    }
};

export default todoListReducer;