
import { View, ActivityIndicator, useColorScheme} from 'react-native'
import React, { useContext, } from 'react'
import {DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native';
import AuthStack from './AuthStack';
import { AuthContext } from '../context/AuthContext';
import AppStack from './AppStack';


const AppNav = () => {
  const scheme = useColorScheme();
  const { isLoading, userToken } = useContext(AuthContext);
  
  if (isLoading) {
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={'large'} />
    </View>
  }
  return (
 
    <NavigationContainer 
    //  theme={scheme === 'dark' ? DarkTheme : DefaultTheme} 
    independent={true}>
      {userToken != null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>

  );
};

export default AppNav;



// import { AuthContext } from '../context/AuthContext';
// import AppStack from './AppStack';

// import Theme from '../screens/Theme'; // Import your Theme provider
// import getStyles from '../Style/logNRegStyle'; // Import your getStyles function

// const AppNav = () => {
//   const scheme = useColorScheme();
//   const { isLoading, userToken } = useContext(AuthContext);

//   if (isLoading) {
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ActivityIndicator size={'large'} />
//     </View>
//   }
//   return (
//     <Theme>
//       {({ theme }) => {
//         const styles = getStyles(theme);

//         return (
//           <NavigationContainer
//             theme={theme === 'DARK' ? DarkTheme : DefaultTheme}
//             independent={true}>
//             {userToken != null ? <AppStack styles={styles}/> : <AuthStack styles={styles}/>}
//           </NavigationContainer>
//         );
//       }}
//     </Theme>
//   );
// };
