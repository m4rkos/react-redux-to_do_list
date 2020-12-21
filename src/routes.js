
import * as React from 'react';
import { View, Text, Button, StatusBar, TouchableOpacity } from 'react-native';
// Navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListContact from './ListContact';
import TodoApp from './TodoApp';

import * as socket from './services/socket';

import { Audio } from 'expo-av';

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

let userAccess = {
    token: '3D6ED84113EF4966B89E79073740300B',
    name: 'MARCOS EDUARDO'
};

socket.login(userAccess.token);

function HomeScreen({navigation}) {

    const [recording, setRecording] = React.useState();    
    const [sound, setSound] = React.useState();
    const [playing, setPlaying] = React.useState(false);

    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,                
                playsInSilentModeIOS: true,                                           
            }); 
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync(); 
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();        
        const uri = recording.getURI(); 
        console.log('Recording stopped and stored at', uri);        
        await playSound(uri);
    }

    // Play
    async function playSound(uri) {        
        try {            
            const { sound } = await Audio.Sound.createAsync(
                {uri: `${uri}`}// : require('../assets/sound/DuaLipa-Break_My_Heart.mp3')
            );
            setSound(sound);            
            setPlaying(true);
            await sound.playAsync()
            .finally(setPlaying(false))  
            // await sound.stopAsync().then(
            //     setPlaying(false)
            // );
            
        } catch (error) {            
            console.log('there are something wrong :( ');
        }
        
    }

    async function pauseSound() {
        console.log('Pause Sound');
        setPlaying(false);
        await sound.pauseAsync();
        //await sound.unloadAsync();
    }
    
    React.useEffect(() => {
        return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);

    return (
        <>
        <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Gravar Sound</Text>

            
            <TouchableOpacity
            onPress={recording ? stopRecording : startRecording}
            >
                <Text>
                    <Icon name={recording ? "stop": "mic"} size={50} color="#ee5253" />
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={playing ? pauseSound : playSound} 
            >
                <Text>
                    <Icon name={playing ? "pause" : "play-arrow"} size={50} color="#ee5253" />
                </Text>
            </TouchableOpacity>

            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('ListContact', {user_token: userAccess.token})}
            />
        </View>
        </>
    );
}
  
const Stack = createStackNavigator();
  
function Route() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Record Sound" component={HomeScreen} />
                <Stack.Screen name="Messenger" component={TodoApp} options={{ title: 'Messenger', headerShown: false }} />
                <Stack.Screen name="ListContact" component={ListContact} user_token_2={ userAccess.token } options={{ title: 'Talkall' }} />
            </Stack.Navigator>            
        </NavigationContainer>
    );
}
  
export default Route;