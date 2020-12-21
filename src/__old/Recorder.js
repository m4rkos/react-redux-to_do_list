import React, {useState, useEffect } from 'react';
import { Audio } from 'expo-av';

import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

const Recorder = () => {
    const [recording, setRecording] = useState();    
    const [sound, setSound] = useState();    

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
    }

    useEffect(() => {
        return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);

    return(
        <TouchableOpacity style={styles.buttonContainer}            
            onPressIn={ startRecording }
            onPressOut={ stopRecording }
            >
            <Text>
                <Icon name="mic" size={20} style={styles.icons} />
            </Text>
        </TouchableOpacity>
    )
}

export default Recorder;