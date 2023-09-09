import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native'
import React, { useContext } from 'react'
const Recentlyadded = () => {
    return (
        <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between', marginLeft: 15, marginRight: 15 }}>
        <Text style={styles.coroselheading}>Recently Added</Text>
        <TouchableOpacity>
          <Text style={{ color: '#0aada8', fontSize: 17 }}>See all</Text>
        </TouchableOpacity>
      </View>
      
     
    <View style={{ marginTop: 10, marginStart: 10 }}>

      <FlatList
          data={products}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => {navigation.navigate('BooksDetailPage') }}>
              <View style={{
                width: 182,
                height: 240,
                marginEnd: 22,
                borderRadius: 10,
                backgroundColor: '#fff3cd'
              }}>
                <View style={{
                  flex: 1,
                  width: 150,
                  marginLeft: 30 / 2,
                  marginTop: 10 / 2,
                  borderRadius: 5,
                  overflow: 'hidden',

                }}>
                  <Image source={{ uri: "https://images.unsplash.com/photo-1519638831568-d9897f54ed69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" }}
                    style={{
                      aspectRatio: 1,
                      resizeMode: 'cover'
                    }} />
                </View>
                <View style={{ padding: 10,  }}>
                  <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#000'
                  }} numberOfLines={1}>Product Title is get from api</Text>

                  
                    <Text style={{
                      backgroundColor: '#a3a3c2',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#fff',
                      marginLeft: 40,
                      marginRight: 40,
                      paddingTop:5,
                      height: 30, 
                      marginTop: 5,
                       borderRadius: 5,
                    }}>Book</Text>
                    <Text style={{ backgroundColor: '#c27b7f',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#fff',
                      marginLeft: 30,
                      marginRight: 40,
                      paddingTop:10,
                      width:100,
                      height: 40, 
                      marginTop: 5,
                       borderRadius: 5,}}>Read More</Text>
                  </View>

                </View>
             
            </TouchableOpacity>

          }
          horizontal
          contentContainerStyle={{ columnGap: 10 }}
        />
      
      </View>

    );
};

export default Recentlyadded;
const styles = StyleSheet.create({
    coroselheading: {
        fontFamily: 'Philosopher-Bold',
        fontSize: 25,
        fontWeight: '600',
        color: '#000',
    }

});