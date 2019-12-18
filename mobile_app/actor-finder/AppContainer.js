import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import MainScreen from './MainScreen';
import SearchHistoryScreen from './SearchHistory';
import AuthLoadingScreen from './components/AuthLoadingScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import UserScreen from './components/UserScreen';

const AppNavigator = createBottomTabNavigator({
    MainScreen: {
        screen: MainScreen,
    },
    SearchHistory: {
        screen: SearchHistoryScreen,
    },
    UserProfile: {
        screen: UserScreen,
    },
});

const AuthNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen,
    }
});

export default createAppContainer(createSwitchNavigator(
    {
        App: AppNavigator,
        Auth: AuthNavigator,
        Register: RegisterScreen,
        AuthLoading: AuthLoadingScreen,
    },
    {
        initialRouteName: 'AuthLoading',
        navigationOptions: () => ({
            header: null,
        })
    },
));