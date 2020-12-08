import React from 'react';
import { View, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import { Thumbnail, Text } from 'native-base';
import { Provider } from 'react-redux';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import store from './store';

import * as socket from './services/socket';

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

export default class TodoApp extends React.Component {   
    render() {
        let token = '3D6ED84113EF4966B89E79073740300B';
        socket.login(token);
        return (
            <Provider store={store} >
                <ImageBackground
                    source={
                        require('../assets/images/bg2.jpg')
                    }
                    style={style.image}
                >
                <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
                <View style={[style.photo, style.imageContainer]}>
                    
                    <View style={style.photoContainer}>
                        <Thumbnail circular source={{ uri: `https://messenger.talkall.com.br/profiles/${token}.jpeg` }} />
                    </View>
                    <View style={style.nameContainer}>
                        <Text style={style.textName}>MARCOS EDUARDO</Text>
                    </View>   
                    <View style={style.optionsContainer}>
                        <Icon name="more-vert" style={style.options} />                        
                    </View>    

                </View>            
                <View style={style.container}>                    
                    <TodoList />
                    
                </View>
                <View style={style.form}>
                    <TodoForm />
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
            //marginLeft: '23%',
            width: 80,
            height: 80,
        },
        form: {
            //backgroundColor: 'rgba(0,0,0,0.02)',       
            backgroundColor: '#f1f1f1',
            paddingTop: 10,
            paddingBottom: 5,
        },

        textName: {
            letterSpacing: 0.2,
            fontWeight: '600',
            color: '#00b894'
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