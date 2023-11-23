import { View, Text,StyleSheet,Image } from 'react-native'
import React,{useEffect} from 'react'

const SplashScreen = ({navigation}) => {
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Home3');

        },2000)
    },[]);
  return (
    <View style={styles.container}>
      <Image
          source={require('../images/Logoelibrary.png')}
          style={{height: 55, width: 170}}
        />
    </View>
  );
};

export default SplashScreen;
const styles=StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#f5ebe6'
    }
});