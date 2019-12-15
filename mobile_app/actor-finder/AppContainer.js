import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MainScreen from '../actor-finder/MainScreen';
import SearchHistoryScreen from '../actor-finder/SearchHistory';

const AppNavigator = createBottomTabNavigator({
    MainScreen: {
        screen: MainScreen,
    },
    SearchHistory: {
        screen: SearchHistoryScreen,
    },
});

export default createAppContainer(AppNavigator);