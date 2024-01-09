
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import Theme from '../screens/Theme';
import getStyles from '../Style/logNRegStyle';

const stack = createNativeStackNavigator();


const AuthStack = () => {
    return (
        <Theme>
            {({ theme }) => {
                const styles = getStyles(theme);

                return (
                    <NavigationContainer independent={true}>
                        <stack.Navigator screenOptions={{ headerShown: false }}>
                            <stack.Screen name='Splash' component={SplashScreen} />
                            <stack.Screen name='Home3' component={AppStack} />
                        </stack.Navigator>
                    </NavigationContainer>
                );
            }}
        </Theme>
    )
}

export default AuthStack;

