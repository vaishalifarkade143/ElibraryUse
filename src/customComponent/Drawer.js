import { View, Text ,Image} from 'react-native'
import React from 'react'
import {DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';

const Drawer =(props)=> {
  return (
    <View style={{flex: 1}}>
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{backgroundColor: '#fff3cd'}}
      >
      
        <Image
          source={require('../images/Logoelibrary.png')}
          style={{height: 55, width: 170,margin:15}}
        />
        
        
      
      <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
   
  </View>
  )
}

export default Drawer;