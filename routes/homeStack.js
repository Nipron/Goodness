import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import Login from '../screens/login';
import Registration from '../screens/registration';
import Profile from '../screens/profile';
import Terms from '../screens/terms';



const screens = {
    Home: {
        screen: Home
    },
    Login: {
        screen: Login
    },
    Registration: {
        screen: Registration
    },
    Profile: {
        screen: Profile
    },
    Terms: {
        screen: Terms
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: 'lightgreen',
            height: 100
        }
    }
})

export default createAppContainer(HomeStack)
