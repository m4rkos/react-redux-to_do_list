import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import { addTodo, setTodoText, updateTodo } from '../actions';
import Input from './Input';

import { pushMsg, pushAudioBase64, pushAudio, makeId } from '../services/socket';
import { FormatShortTime, GetRandomInt } from '../services/formatDate';
import { setMessagesByChatList } from '../model/storage';

//import Recorder from './Recorder';
import { Audio } from 'expo-av';

//import base64 from 'react-native-base64';
//import * as FileSystem from 'expo-file-system';
import RNFS from 'react-native-fs';

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

let recording = undefined;

class TodoForm extends React.Component {

    constructor(props) {
        super(props);        
        this.state = { 
            rec: null,
            sound: null,
            downloadProgress: 0,
        };
    }

    async startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,                
                playsInSilentModeIOS: true,                                           
            }); 
            console.log('Starting recording..');     
            recording = new Audio.Recording();       
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync(); 
            this.setState({rec: recording});            
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async stopRecording() {
        console.log('Stopping recording..');        
        this.setState({rec: undefined});        
        await recording.stopAndUnloadAsync();        
        const uri = recording.getURI(); 
        console.log('Recording stopped and stored at', uri);    

        let token = makeId();
        let ct = Math.floor(Date.now() / 1000);

        //const new_audio = await FileSystem.readAsStringAsync(uri);
        this.props.dispatchAddTodo(uri, 2, token, 0, FormatShortTime(ct), '', '', 2, uri);                                 

        RNFS.readFile(uri, 'base64')
        .then(res =>{
            console.log(res);                        
            pushAudioBase64(this.props.user_data.token, res, token, 10);        

            let msgData = {
                talk_all_token_id: this.props.user_talkall,
                token: token,
                key_from_me: 2,
                key_remote_id: this.props.user_data.token,                
                msg: res,
                status: 1,                
                ct: ct,
                media_caption: '',
                media_title: '',
                media_mime_type: 2,
                media_url: uri,
                media_duration: 10 
            }
            setMessagesByChatList(msgData);
        });

        //pushMsg(this.props.user_data.token, base64.encode(uri), token);        

        

        // const callback = downloadProgress => {
        //     const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        //     this.setState({
        //         downloadProgress: progress,
        //     });
        // };

        // let number = GetRandomInt(1000);
        // const downloadResumable = FileSystem.createDownloadResumable(
        //     'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        //     FileSystem.documentDirectory + `${number}.m4a`,
        //     {},
        //     callback
        // );
          
        // try {
        //     const { uri } = await downloadResumable.downloadAsync();
        //     console.log('Finished downloading to ', uri);
        // } catch (e) {
        //     console.error(e);
        // }
          
        //console.log(base64.encode({uri: uri}));

    }

    componentWillUnmount(){
        return this.sound
        ? () => {
            console.log('Unloading Sound');
            this.sound.unloadAsync(); 
        }
        : undefined;
    }
    
    onChangeText(text){        
        this.props.dispatchSetTodoText(text);                
    }

    onPress(){        
        const { todo } = this.props;
        Keyboard.dismiss();

        if(todo.id)
            return this.props.dispatchUpdateTodo(todo);
        
        if( todo.text != '' ){
            let token = makeId();
            let ct = Math.floor(Date.now() / 1000);

            this.props.dispatchAddTodo(todo.text, 2, token, 0, FormatShortTime(ct), '', '', 1, '');                          
            pushMsg(this.props.user_data.token, todo.text, token);

            let msgData = {
                talk_all_token_id: this.props.user_talkall,
                token: token,
                key_from_me: 2,
                key_remote_id: this.props.user_data.token,                
                msg: todo.text,
                status: 1,                
                ct: ct,
                media_caption: '',
                media_title: '',
                media_mime_type: 1,
                media_url: '',
                media_duration: 0 
            }
            setMessagesByChatList(msgData);

        }else{
            Alert.alert('Preencha o texto!!');
        }        
        
    }

    render() {         
        const { text, id } = this.props.todo;
        return (            
            <View style={styles.formContainer} >                
                <View style={styles.inputContainer}>                                                        
                    <Input 
                        onChangeText={text => this.onChangeText(text)}
                        value={text}  
                        onPressIn={() => this.startRecording()}
                        onPressOut={() => this.stopRecording()}
                    />
                </View>                
                <View style={styles.buttonContainer}>                
                    <TouchableOpacity
                        style={[styles.btn,
                            id ? styles.saveBg : styles.addBg
                        ]}
                        onPress={()=> this.onPress()}
                        >
                        <Text style={styles.text_white}>
                            {id ? <Icon name="save" size={20} color="#fff" style={styles.check} /> : <Icon name="send" size={20} color="#fff" style={styles.check} />}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    padd: {
        padding: 10,
    },
    saveBg: {
        backgroundColor: '#6c5ce7', 
    },
    addBg: {
        backgroundColor: '#0984e3', 
    },
    btnRec: {
        backgroundColor: '#222',
    },
    btn: {    
        marginRight: 18,               
        marginLeft: 12,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text_white: {
        alignSelf: 'center',
        alignContent: 'stretch',
        color: '#fff',        
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    //Containers
    formContainer: {
        flexDirection: 'row',
    },
    inputContainer: {
        flex: 4,
    },
    buttonContainer: {
        flex: 1,
    },
})

const mapStateToProps = state =>{
    return {
        todo: state.editingTodo
    }
}

export default connect(mapStateToProps, {
    dispatchAddTodo: addTodo, 
    dispatchSetTodoText: setTodoText,
    dispatchUpdateTodo: updateTodo
})(TodoForm);