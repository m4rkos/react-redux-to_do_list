import React from 'react';
import { View, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import { Thumbnail, Text } from 'native-base';
import { Provider } from 'react-redux';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import store from './store';
import { createTables, setChatList } from './model/storage';

import * as socket from './services/socket';

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

export default class TodoApp extends React.Component {   
    render() {
        let data = [
            {
                token: '3D6ED84113EF4966B89E79073740300B',
                name: 'MARCOS EDUARDO'
            },{
                token: '9720F31898A6402F9861FED3C9E49E37',
                name: 'THAISE IUNGLEBODE'
            },{
                token: '359C28FD1E1140FCB335593FD19DEF6B',
                name: 'MARCOS TESTE :)'
            },{
                token: 'D6D928FCB4B44D0AA21D2276F8D77D28',
                name: 'RUAN KENNEDI'
            }
        ];
        
        let user = 2;

        createTables();

        let chatListData = {
            key_remote: data[0].token, 
            key_remoto_to: data[user].token, 
            name_to: data[user].name
        };

        setChatList(chatListData);        

        socket.login(chatListData.key_remote);
        
        return (
            <Provider store={store}>
                <ImageBackground
                    source={ require('../assets/images/bg2.jpg') }
                    style={style.image}
                >
                <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
                <View style={[style.photo, style.imageContainer]}>
                    
                    <View style={style.photoContainer}>
                        <Thumbnail circular source={{ uri: `https://messenger.talkall.com.br/profiles/${data[user].token}.jpeg` }} />
                    </View>
                    <View style={style.nameContainer}>
                        <Text style={style.textName}>{data[user].name}</Text>
                    </View>   
                    <View style={style.optionsContainer}>
                        <Icon name="more-vert" style={style.options} />                        
                    </View>    

                </View>            
                <View style={style.container}>                    
                    <TodoList user_data={data[user]} />                    
                </View>
                <View style={style.form}>
                    <TodoForm user_data={data[user]} user_talkall={data[0].token} chat_list={user} />
                </View>
                </ImageBackground>
            </Provider>
        )
    }
}

const style = StyleSheet.create(
    {
        container: {
            flex: 4,
            paddingTop: 10,                
            paddingBottom: 10,                
            backgroundColor: 'rgba(0,0,0,0.02)',       
        },
        photo: {
            alignItems: 'flex-start',            
            borderBottomColor: 'rgba(0,0,0,0.1)',
            backgroundColor: 'rgba(255,255,255,0.4)',       
            borderBottomWidth: 1,  
            paddingTop: 15,          
            paddingBottom: 14,
            paddingLeft: 12,            
        },
        image: {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
            backgroundColor: 'rgba(0,0,0,0.5)'
        },
        brand: {
            flex: 1,
            alignItems: 'center',            
        },
        tinyLogo: {
            marginTop: 25,
            width: 80,
            height: 80,
        },
        form: {            
            backgroundColor: '#f1f1f1',
            paddingTop: 10,
            paddingBottom: 5,
        },

        textName: {
            letterSpacing: 0.2,
            fontWeight: '600',            
        },

        //Containers
        imageContainer: {
            flexDirection: 'row',
        },
        photoContainer: {
            flex: 1,
        },
        nameContainer: {
            flex: 3,
            alignSelf: 'stretch',
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        optionsContainer: {
            flex: 1,
            alignSelf: 'stretch',
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
        options: {
            fontSize: 40,
            paddingEnd: 10,
        },
    }
)