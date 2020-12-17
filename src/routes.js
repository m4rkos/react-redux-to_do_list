
import * as React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
// Navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListContact from './ListContact';
import TodoApp from './TodoApp';

import * as socket from './services/socket';

// function DetailsScreen() {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Details Screen</Text>
//         </View>
//     );
// }

let userAccess = {
    token: '3D6ED84113EF4966B89E79073740300B',
    name: 'MARCOS EDUARDO'
};

socket.login(userAccess.token);

function HomeScreen({navigation}) {
    return (
        <>
        <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
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
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Messenger" component={TodoApp} options={{ title: 'Messenger', headerShown: false }} />
                <Stack.Screen name="ListContact" component={ListContact} user_token_2={ userAccess.token } options={{ title: 'Talkall' }} />
            </Stack.Navigator>            
        </NavigationContainer>
    );
}
  
export default Route;