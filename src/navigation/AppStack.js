import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Drawer from '../customComponent/Drawer';
import Contact from '../screens/Contact';
import About from '../screens/About';
import Terms from '../screens/Terms';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Disclaimer from '../screens/Disclaimer';
import TabNavigator from './TabNavigator';
import Theme from '../screens/Theme';
import getStyles from '../Style/logNRegStyle';



const drawer = createDrawerNavigator();


const AppStack = () => {
  return (
    <Theme>
      {({ theme }) => {
        const styles = getStyles(theme);

        return (
          <drawer.Navigator
            drawerContent={props => <Drawer {...props} />}
            screenOptions={{
              headerShown: false,
              drawerActiveBackgroundColor: '#c07b7f',
              drawerActiveTintColor: '#fff',
              drawerInactiveTintColor: '#333',
              drawerLabelStyle: {
                fontFamily: 'Poppin',
                fontSize: 15,
                fontWeight: '800',
              },
            }}>

            <drawer.Screen name='Home'
              component={TabNavigator} />
            <drawer.Screen
              name="Contact"
              component={Contact}
              options={{ headerShown: false }} />
            <drawer.Screen
              name="About"
              component={About}
              options={{ headerShown: false }} />
            <drawer.Screen
              name="Terms"
              component={Terms}
              options={{ headerShown: false }}
            />
            <drawer.Screen
              name="PrivacyPolicy"
              component={PrivacyPolicy}
              options={{ headerShown: false }}
            />
            <drawer.Screen
              name="Disclaimer"
              component={Disclaimer}
              options={{ headerShown: false }}
            />
          </drawer.Navigator>
        );
      }}
    </Theme>
  );
};


export default AppStack;