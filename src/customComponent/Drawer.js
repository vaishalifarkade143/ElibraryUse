
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const Drawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#f5ebe6' }}
      >

        <Image
          source={require('../images/Logoelibrary.png')}
          style={{ height: 55, width: 170, margin: 15 }}
        />



        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>


      <View style={{ flexDirection: 'end' }}>
        {/* <Text style={{paddingBottom:8,textAlign:'center',fontSize:20,fontWeight:'bold',right:15}}>Our address</Text>
          <Text style={{textAlign:'center',right:15}}>Nagpur{"\n"}Maharashtra</Text>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',right:15}}>
            <TouchableOpacity onPress={() => {Linking.openURL('https://www.facebook.com/')}}>
             
              <Image
          source={require('../images/facebook.png')}
          style={{height: 25, width: 25,margin:10}}
        />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {Linking.openURL('https://www.twitter.com/')}}>
              
              <Image
          source={require('../images/twitter.png')}
          style={{height: 25, width: 25,margin:4}}
        />
            </TouchableOpacity>
      </View> */}



        <Image
          source={require('../images/smartCity.png')}
          style={{ height: 65, width: 210, margin: 20 }}
        />
        <View style={{ marginBottom: 15, flexDirection: 'row' ,alignItems:'center',justifyContent:'center'}}>
          <Text>©2024 </Text>
          <TouchableOpacity
            onPress={() => { Linking.openURL('https://www.educron.com//') }}>
            <Text style={{ color: 'blue' }}>Educron.</Text>
          </TouchableOpacity>
          <Text>All rights reserved.</Text>

        </View>

      </View>


    </View>
  )
}

export default Drawer;