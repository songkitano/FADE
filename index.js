// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
import { Navigation } from 'react-native-navigation';
import App from './App';
import Result from './components/Result';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

Navigation.registerComponent('App', () => App);
Navigation.registerComponent('Result', () => Result);
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'App',
                            options: {
                                topBar: {
                                    visible: false,
                                }
                            }
                        }
                    }
                ]
            }
        }
    })
})
