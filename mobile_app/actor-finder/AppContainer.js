import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import MainScreen from './MainScreen';
import SearchHistoryScreen from './SearchHistory';
import AuthLoadingScreen from './components/AuthLoadingScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';


const AppNavigator = createBottomTabNavigator({
    MainScreen: {
        screen: MainScreen,
    },
    SearchHistory: {
        screen: SearchHistoryScreen,
    },
});

const AuthNavigator = createStackNavigator({Login: LoginScreen});

export default createAppContainer(createSwitchNavigator(
    {
        App: AppNavigator,
        Auth: AuthNavigator,
        AuthLoading: AuthLoadingScreen,
    },
    {
        initialRouteName: 'AuthLoading'
    })
);