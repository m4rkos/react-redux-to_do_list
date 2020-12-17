import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import { addTodo, setTodoText, updateTodo } from '../actions';
import Input from './Input';

import { pushMsg, makeId } from '../services/socket';
import { FormatShortTime } from '../services/formatDate';
import { setMessagesByChatList } from '../model/storage';

import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

class TodoForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggingIn: false,
            recordSecs: 0,
            recordTime: '00:00:00',
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '00:00:00',
            duration: '00:00:00',
        };
        this.audioRecorderPlayer = new AudioRecorderPlayer();
        this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1    
    }

    // To record audio
    onStartRecord = async () => {
        const path = 'hello.m4a';        
        const audioSet = {        
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,        
            AudioSourceAndroid: AudioSourceAndroidType.MIC,        
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,        
            AVNumberOfChannelsKeyIOS: 2,        
            AVFormatIDKeyIOS: AVEncodingOption.aac,        
        };
        console.log('audioSet', audioSet);        
        const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);        
        this.audioRecorderPlayer.addRecordBackListener((e) => {        
            this.setState({        
                recordSecs: e.current_position,        
                recordTime: this.audioRecorderPlayer.mmssss(        
                    Math.floor(e.current_position),        
                ),        
            });        
        });        
        console.log(`uri: ${uri}`);    
    };
    onStopRecord = async () => {        
        const result = await this.audioRecorderPlayer.stopRecorder();        
        this.audioRecorderPlayer.removeRecordBackListener();        
        this.setState({
            recordSecs: 0,        
        });        
        console.log(result);    
    };
    
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

            this.props.dispatchAddTodo(todo.text, 2, token, 0, FormatShortTime(ct));                          
            pushMsg(this.props.user_data.token, todo.text, token);

            let msgData = {
                talk_all_token_id: this.props.user_talkall,
                token: token,
                key_from_me: 2,
                key_remote_id: this.props.user_data.token,                
                msg: todo.text,
                status: 1,                
                ct: ct
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
                    <Text>{this.state.recordTime}</Text>
                    {/* <TouchableOpacity 
                        mode="contained" 
                        icon="play" 
                        style={[styles.btn, styles.saveBg]}                        
                        onPress={() => this.onStartPlay()}
                        >
                        <Text style={styles.text_white}>PLAY</Text>
                    </TouchableOpacity> */}
                    <Input 
                        onChangeText={text => this.onChangeText(text)}
                        value={text}  
                        onPressIn={() => this.onStartRecord()}
                        // onPressOut={() => this.onStopRecord()}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => this.onStopRecord()}
                >
                    <Text>stop</Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>                
                    <TouchableOpacity
                        style={[styles.btn,
                            id ? styles.saveBg : styles.addBg
                        ]}
                        onPress={()=> {this.onPress();}}
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
    saveBg: {
        backgroundColor: '#6c5ce7', 
    },
    addBg: {
        backgroundColor: '#0984e3', 
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