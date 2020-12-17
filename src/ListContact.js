import React from 'react';
import { View, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import { Thumbnail, Text } from 'native-base';
import { Provider } from 'react-redux';

import SearchForm from './components/SearchForm';
import ContactList from './components/ContactList';
import store from './store';

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

export default class TodoApp extends React.Component {   
    render() {
        let data = [
            {
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
        
        let user_id = this.props.route.params.user_token;
        
        return(
            <Provider store={store}>
                <ImageBackground
                        source={ require('../assets/images/bg2.jpg') }
                        style={style.image}
                    >
                    <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
                    <View style={[style.search, style.imageContainer]}>
                                            
                        <View style={style.searchContainer}>                            
                            <SearchForm  />
                        </View>   

                    </View>            
                    <View style={style.container}>
                        <ContactList users={data} user_id={user_id} />                            
                        
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
            paddingTop: 0,                
            paddingBottom: 1,                
            backgroundColor: 'rgba(0,0,0,0.02)',       
        },
        search: {
            alignItems: 'flex-start',            
            borderBottomColor: 'rgba(0,0,0,0.1)',
            backgroundColor: 'rgba(255,255,255,0.8)',       
            borderBottomWidth: 1,  
            paddingTop: 7,          
            paddingBottom: 0,
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
        searchContainer: {
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