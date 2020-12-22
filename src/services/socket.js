//import AsyncStorage from '@react-native-community/async-storage';
//import * as db from '../model/data_base';
import { addTodo, setTodoText, updateTodo, updateAckTodo } from '../actions';
import store from '../store';

import { FormatShortTime } from '../services/formatDate';
import { setMessagesByChatList, updateMessagesByChatList } from '../model/storage';

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

export const makeId = () => {
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

export const pushAudio = (key_to, media_url, key_id) =>{
    let data = { 
        Cmd: "AudioMessage",
        key_id: key_id,
        to: `${key_to}`,
        media_key: "", // Ver depois, implementação futura
        media_duration: 0,
        media_url: media_url,
    }
    sendMessage(_ => {
        wsChannel.send(JSON.stringify(data));
    });
}

export const pushAudioBase64 = (key_to, base64, key_id, media_duration) =>{
    let data = { 
        Cmd: "AudioMessage",
        key_id: key_id,
        to: `${key_to}`,
        media_key: "", // Ver depois, implementação futura
        media_duration: media_duration,
        base64: 'data:audio/ogg;base64,'+base64,
        media_mime_type: 'audio/ogg',
    }
    sendMessage(_ => {
        wsChannel.send(JSON.stringify(data));
    });
}

export const sendDocument = (key_to, key_id, file_name, media_mime_type, page_count, media_url) => {
    let data = {
        Cmd: "DocumentMessage",
        key_id: key_id,
        to: `${key_to}`,
        file_name: file_name,
        media_caption: file_name,
        media_title: file_name,
        media_mime_type: media_mime_type,
        page_count: page_count,
        media_url: media_url,
    }
    sendMessage(_ => {
        wsChannel.send(JSON.stringify(data));
    });
}

export const pushMsg = (key_to, msg, key_id) => {       
    let data = {
        Cmd: "TextMessage",
        data: msg,
        key_id: key_id,
        to: `${key_to}`,        
    };
    sendMessage(_ => {
        wsChannel.send(JSON.stringify(data));
    });
};

export const pushImageBase64 = (key_to, base64, key_id, media_caption) => {
    let data = {
        Cmd: "ImageMessage",
        key_id: key_id,
        to: key_to,
        thump_image: "",
        base64: base64,
        media_caption: media_caption,
        media_mime_type: 'image/jpeg',
    };
    sendMessage(_ => {
        wsChannel.send(JSON.stringify(data));
    });
}

export const pushImage = (key_to, media_url, key_id, media_caption) => {
    let data = {
        Cmd: "ImageMessage",
        key_id: key_id,
        to: key_to,
        thump_image: "",
        media_caption: media_caption,
        media_mime_type: 'image/jpeg',
        media_url: media_url
    };
    sendMessage(_ => {
        wsChannel.send(JSON.stringify(data));
    });
}

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
                    case 'Chat':
                        json.items.forEach(chats => {
                            for(let el = 0; el < 30; el++) {
                                if(chats.messages[el].key_from_me == 1){
                                    if(chats.messages[el].media_type == 1){                                        
                                        let msgData = {                                
                                            token: chats.messages[el].token,
                                            key_from_me: chats.messages[el].key_from_me,
                                            key_remote_id: chats.messages[el].key_remote_id,                
                                            msg: chats.messages[el].data,
                                            status: chats.messages[el].msgStatus,                
                                            ct: chats.messages[el].creation
                                        }
                                        setMessagesByChatList(msgData);                                        
                                        console.log(msgData);
                                    }
                                }
                            }   
                        });                        
                        break
                        
                    case 'Msg':                        
                        let data_msg = {
                            key_remote_id: json.key_remote_id,
                            key_from_me: json.key_from_me,
                            msg: json.data,
                            status: json.msgStatus,
                            token: json.token,
                            ct: json.creation
                        }
                        console.log(arguments)   
                        if(data_msg.key_from_me == 1){
                            store.dispatch(addTodo(
                                data_msg.msg, 
                                data_msg.key_from_me,
                                data_msg.token,
                                data_msg.status, //ack
                                FormatShortTime(data_msg.ct),
                                '', 
                                '', 
                                1, 
                                ''
                            ));
                            let msgData = {                                
                                token: data_msg.token,
                                key_from_me: data_msg.key_from_me,
                                key_remote_id: data_msg.key_remote_id,                
                                msg: data_msg.msg,
                                status: data_msg.status,                
                                ct: data_msg.ct,
                                media_caption: '',
                                media_title: '',
                                media_mime_type: 1,
                                media_url: uri,
                                media_duration: 0                                
                            }
                            setMessagesByChatList(msgData);
                        }                                                                        
                        break

                    case 'Ack':                        
                        let data_ack = {
                            token: json.token,
                            ack: json.ack
                        };
                        store.dispatch(updateAckTodo(
                            data_ack.ack,
                            data_ack.token
                        ));                        
                        updateMessagesByChatList(data_ack)
                        break;

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