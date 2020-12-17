import SQLite from 'react-native-sqlite-storage';
import { addTodo, setTodoText, updateTodo, updateAckTodo } from '../actions';
import store from '../store';

import { FormatShortTime } from '../services/formatDate';
import { pushMsg } from '../services/socket';

/* --- Define DB and access or set data --- */

let database;

const open = async () => {  
    SQLite.DEBUG(false);
    SQLite.enablePromise(true);
    let databaseInstance = null;

    const sqlite = await SQLite.openDatabase({
        name: 'db-talkall-app',
        location: 'default',
    });

    databaseInstance = sqlite;

    database = databaseInstance;
    return database;
};

const getDatabase = async () => {  
    if (database !== undefined) {
        return database;
    }
    return open();
};


/* -- Queries -- */

// Read
// export const getChatList = (key_remote, key_remoto_to) => {
//     return getDatabase().then(db => 
//         db
//             .executeSql(`SELECT id FROM CHAT_LIST WHERE key_remote_id = '${key_remote}' and key_remote_id_to = '${key_remoto_to}' `)
//             .then(([results]) => {
//             if (results === undefined) {
//                 return [];
//             }            
//             const chatList = [];
//             for (let i = 0; i <= results.rows.length; i++) {
//                 const row = results.rows.item(i);
//                 chatList.push(row);
//             }                        
//             return chatList[0].id;
//         })
//     );
// }
export const getMessagesByChatList = (chat_list_token) => {

    return getDatabase().then(db => 
        db
            .executeSql(`SELECT * FROM ( SELECT * FROM MESSAGES WHERE id_chat_list = (
                SELECT id FROM CHAT_LIST WHERE key_remote_id_to = '${chat_list_token}' 
            ) order by creation desc limit 10 ) AS res 
                ORDER BY creation ASC`)
            .then(([results]) => {
            if (results === undefined) {
                return [];
            }                        
            const messages = [];
            for (let i = 0; i < results.rows.length; i++) {
                const row = results.rows.item(i);                
                messages.push(row);

                if(messages[i].key_from_me == 2 && messages[i].status < 2){                    
                    pushMsg(messages[i].key_remote_id, messages[i].data, messages[i].key_id);                
                }                

                store.dispatch(addTodo(
                    messages[i].data, 
                    messages[i].key_from_me,
                    messages[i].key_id,
                    messages[i].status, //ack
                    FormatShortTime(messages[i].creation)
                ));                                        
            }                                          
            return messages;
        })
    );
}

// Create
export const setChatList = (data) => {
    return getDatabase()
        .then(db =>
            db.executeSql(`INSERT INTO CHAT_LIST (key_remote_id, key_remote_id_to, name_to) 
                VALUES (?, ?, ?) `, [
                data.key_remote, 
                data.key_remoto_to, 
                data.name_to
            ])
        )
        .then(([results]) => {
            const { insertId } = results;
            if(insertId > 0){
                return console.log(`[createChatListRow] Added user: ${data.name_to} ! InsertId: ${insertId}`);
            }            
            console.log('List is there!');
        });
}
export const setMessagesByChatList = (data) => {
    
    let chat_list_id = `SELECT id FROM CHAT_LIST WHERE key_remote_id_to = '${data.key_remote_id}' `;
    
    if(data.key_from_me == 2){
        chat_list_id = `SELECT id FROM CHAT_LIST WHERE key_remote_id = '${data.talk_all_token_id}' and key_remote_id_to = '${data.key_remote_id}' `;
    }

    return getDatabase()
        .then(db =>
            db.executeSql(`INSERT INTO MESSAGES (id_chat_list, key_id, key_from_me, key_remote_id, data, status, creation ) 
                VALUES (
                    (${chat_list_id}), ?, ?, ?, ?, ?, ?) `, [                
                data.token,
                data.key_from_me,
                data.key_remote_id,                
                data.msg,
                data.status,                
                data.ct
            ])
        )
        .then(([results]) => {
            const { insertId } = results;
            if(insertId > 0){
                console.log(`[insertedMessage], InsertId: ${insertId}`);
                return {id:insertId, }
            }            
            console.log('List is there!');
        });
}

// Update
export const updateMessagesByChatList = (data) => {
    
    return getDatabase()
        .then(db =>
            db.executeSql(`UPDATE MESSAGES SET status = ? WHERE key_id = ? `, [                
                data.ack,
                data.token                
            ])
        )
        .then(([results]) => {
            if (results === undefined) {
                return [];
            }                   
            console.log(`[updateUser] update ack: ${data.ack} !`);
        });
}


/* --------- Create tables ----------- */

export const createTables = () => {

    // DANGER! For dev only
    const dropAllTables = false;

    if (dropAllTables) {      
        getDatabase().then(db => db.executeSql('DROP TABLE IF EXISTS CHAT_LIST;'));      
        getDatabase().then(db => db.executeSql('DROP TABLE IF EXISTS MESSAGES;'));      
        //storeData('userData', null);      
        console.log('Recriated Tables');
    }
                            
    // ChatList table
    getDatabase().then(db =>
        db.executeSql(
            'CREATE TABLE IF NOT EXISTS CHAT_LIST( ' +
                'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
                'key_remote_id TEXT,' + 
                'key_remote_id_to TEXT,' + 
                'name_to TEXT, ' +                     
                'status INTEGER DEFAULT 1,' +
                'ct DATETIME DEFAULT CURRENT_TIMESTAMP,' +    
                'UNIQUE(key_remote_id, key_remote_id_to, status)' +
            ');'
        )
    );

    // Messages table
    getDatabase().then(db =>
        db.executeSql(
            'CREATE TABLE IF NOT EXISTS MESSAGES( ' +
                'id_message INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
                'id_chat_list INTEGER, ' +
                'creation INTEGER, ' + 
                'key_id TEXT, ' + 
                'key_from_me INTEGER, ' +
                'key_remote_id TEXT, ' + 
                'need_push INTEGER, ' +
                'data TEXT, ' +
                'status INTEGER, ' +
                'media_type INTEGER, ' +
                'media_url TEXT, ' + 
                'media_mime_type TEXT, ' +
                'media_size INTEGER, ' +
                'media_name TEXT, ' +
                'media_caption, TEXT ' +
                'media_hash TEXT, ' +
                'media_duration INTEGER, ' +
                'latitude TEXT, ' + 
                'longitude TEXT, ' +
                'thumb_image TEXT, ' +
                'send_timestamp INTEGER, ' +
                'receipt_server_timestamp INTEGER, ' +
                'read_device_timestamp INTEGER, ' + 
                'played_device_timestamp TEXT, ' +
                'quoted_row_id TEXT, ' +
                'participant TEXT, ' + 
                'file_name TEXT, ' +
                'title text INTEGER, ' +
                'page_count INTEGER, ' + 
                'forwarded INTEGER, ' +   
                'ct DATETIME DEFAULT CURRENT_TIMESTAMP, ' +              
                'UNIQUE(key_id)' +
            ');'
        )
    );

    console.log("DB it's worke well...");
};