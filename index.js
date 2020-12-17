import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

import App from './src/routes';
//import App from './src/TodoApp';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
LogBox.ignoreAllLogs(); // Ignore Yellow alert
registerRootComponent(App);
