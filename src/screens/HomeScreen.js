import { View, Text,Image,StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';


const HomeScreen = ({navigation}) => {
  const {userInfo} = useContext(AuthContext);
 const {userToken} = useContext(AuthContext);
  return (
    <View style={styles.container}>
    <Header
      rightIcon={require('../images/Logoelibrary.png')}
      leftIcon={require('../images/menu.png')}
      onClickLeftIcon={() => {
      navigation.openDrawer();
    
      }}
    />

    <View style={styles.bannar}>
      <View style={styles.mainImgNText}>
        <View >
          <Image
            source={require('../images/hero-brownElib.png')}
            style={styles.imagecontainer}
            resizeMode='contain'
          />
        </View>
        <View style={styles.text}>
          <Text style={styles.texth1}>Nagpur Digital Library</Text>
          <Text style={styles.texth2}>Serving You Millions of eResources | 24x7 | Everywhere</Text>
        </View >
      </View>
      
    
    </View>
    {/* <Text>hello {userInfo.data.user.first_name} </Text> */}
  </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannar: {
    margin:5,
    height: 200,
    backgroundColor: "#fff3cd",
    flexDirection: 'column',
    paddingRight: 10,
    justifyContent: 'center'
  },
  mainImgNText: {
    flexDirection: 'row',
    marginTop: 20,
    position: 'fixed'
  },
  imagecontainer: {
    width: 160,
    height: '70%'
  },
  text: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',

  },
  texth1: {
    flexBasis: 'auto',
    fontSize: 29,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Philosopher-Bold',
  },
  texth2: {
    fontSize: 14,
    marginTop: 8,
    color: '#676768',
    textAlign: 'center',
    fontFamily: 'Poppin-Thin',
  },
});
