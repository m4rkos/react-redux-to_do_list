import React from 'react';
import { View, StyleSheet, StatusBar, ImageBackground, Image } from 'react-native';
import { Thumbnail, Text } from 'native-base';
import { Provider } from 'react-redux';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import store from './store';
import { createTables, setChatList } from './model/storage';

//import * as socket from './services/socket';

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

export default class TodoApp extends React.Component {  

    state = {
        image: `https://messenger.talkall.com.br/profiles/${this.props.route.params.token}.jpeg`,
        result: null,
    }

    render() {

        const { image, result } = this.state;        

        const checkImageURL = (url) =>{            
            fetch(url)                
                .then(res => {
                    if(res.status == 404){                     
                        console.log(res.status);                    
                    }else{                    
                        console.log(res.status);                    
                    }
                }
            )
        };
        
        let data = {
                token: this.props.route.params.token,
                name: this.props.route.params.name
            };
        
        let contact = this.props.route.params.id;        
        let user_token = this.props.route.params.user_token;
        
        createTables();

        let chatListData = {
            key_remote: user_token, 
            key_remoto_to: data.token, 
            name_to: data.name
        };

        setChatList(chatListData);      

        let checkImage = checkImageURL(image)               
        /*
        {                                     
            uri: `https://messenger.talkall.com.br/profiles/${data.token}.jpeg` 
        }
        */
        
        return (            
            <Provider store={store}>
                <ImageBackground
                    source={ require('../assets/images/bg2.jpg') }
                    style={style.image}
                >
                    <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
                    <View style={[style.photo, style.imageContainer]}>
                        
                        <View>
                            <Icon name="arrow-back" 
                            style={style.goBack} 
                            onPress={() => this.props.navigation.navigate('ListContact')} />                        
                            
                        </View>
                        <View style={style.photoContainer}>
                            <Thumbnail circular source={
                                checkImage != 404 ? { uri: image } : require('../assets/images/avatar.jpg')
                            } />                            
                        </View>
                        <View style={style.nameContainer}>
                            <Text style={style.textName}>{data.name}</Text>
                        </View>   

                    </View>            
                    <View style={style.container}>                    
                        <TodoList user_data={data} />                    
                    </View>
                    <View style={style.form}>
                        <TodoForm user_data={data} user_talkall={user_token} chat_list={contact} />
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
            paddingTop: 5,                
            paddingBottom: 5,                
            backgroundColor: 'rgba(0,0,0,0.02)',       
        },
        photo: {
            alignItems: 'flex-start',            
            borderBottomColor: 'rgba(0,0,0,0.1)',
            backgroundColor: 'rgba(255,255,255,0.4)',       
            borderBottomWidth: 1,  
            paddingTop: 4,          
            paddingBottom: 4,
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
            paddingStart: 5,
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
        goBack: {
            fontSize: 30,
            fontWeight: 'bold',
            paddingTop: 13,
            paddingEnd: 5,
        }
    }
)