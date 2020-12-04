//import AsyncStorage from '@react-native-community/async-storage';
//import * as db from '../model/data_base';
import { addTodo, setTodoText, updateTodo } from '../actions';
import store from '../store';

let ip = ['messenger-hom.gelt.com.br:3030', '187.18.106.9:3030'];

let WebSocketStateEnum = {
    CONNECTING: 0, 
    OPEN: 1, 
    CLOSING: 2, 
    CLOSED: 3
};
let wsChannel;
let msgQueue = [];

export const socket = () =>{        
    let socket = new WebSocket(`wss://${ip[0]}`);  
    return socket;       
};

const makeId = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 32; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        
    return text;
};

export const login = (key_remote_id) => {        
    let ta_logon = {
        Cmd: "login",
        account: `${key_remote_id}`,
        pw: `${key_remote_id}`,
        version: "2.2027.15",
    };
    sendMessage(_ => {
        wsChannel.send(JSON.stringify(ta_logon));
    });
    //AsyncStorage.setItem('login', key_remote_id);
    console.log('connected');
    return "connected";
};

export const pushMsg = (key_to, msg, key_remote_id) => {       
    let data = {
        Cmd: "TextMessage",
        data: msg,
        key_id: makeId(),
        to: `${key_to}`,        
    };
    sendMessage(_ => {
        wsChannel.send(JSON.stringify(data));
    });
};

export const searchContact = (contact) => {       
    let data = {
        Cmd: "queryContact", 
        data: `${contact}`,
    };
    sendMessage(_ => {
        wsChannel.send(JSON.stringify(data));
    });
};

// const storeContact = (key, data_items) => {        
//     try {        
//         db.storeData( key, JSON.stringify(data_items) );
//         console.log('ok, all data in list');
//     } catch (error) {
//         console.log('No data yet')    
//     }
// };

export function sendMessage(task) {
    if (!wsChannel || wsChannel.readyState != WebSocketStateEnum.OPEN) {
        msgQueue.push(task);
    } else {
        task();
    }
    if (!wsChannel) {
        wsChannel = socket();
        wsChannel.onopen = function() {
            while (msgQueue.length > 0) {
                msgQueue.shift()();
            }
        }
        wsChannel.onmessage = function(evt) {                        
            let json = JSON.parse(evt.data);
            if (json.status == 200) {

                switch (json.Cmd) {                    
                    case 'Msg':                        
                        let data_msg = {
                            key_remote_id: json.key_remote_id,
                            key_from_me: json.key_from_me,
                            msg: json.data,
                            status: json.msgStatus,
                            ct: json.creation,
                        }
                        console.log(arguments)   
                        if(data_msg.key_from_me == 1){
                            store.dispatch(addTodo(data_msg.msg));
                        }                                                
                        //storeContact('msgsNew', data_msg) 
                        //db.RegisterMSG(data_msg)
                        break

                    case 'queryContact':
                        let data_contact = json.items                        
                        //storeContact('searchList', data_contact)                        
                        break

                    default:                        
                        break       
                }
            }            
        }
        wsChannel.onclose = function(evt) {
            wsChannel = null;
        }
        wsChannel.onerror = function(evt) {
            if (wsChannel.readyState == WebSocketStateEnum.OPEN) {
                wsChannel.close();
            } else {
                wsChannel = null;
            }
        }
    }
}