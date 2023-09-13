
import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
// import axios from 'axios';
// import SearchBarComponent from '../components/SearchBarComponent';


const Search = () => {
 

  return (
    <View>

   
    </View>
  );
};

export default Search;














// import { View, Text,StyleSheet,SafeAreaView,ActivityIndicator,FlatList,Image,TextInput } from 'react-native'
// import React,{useState,useEffect} from 'react'

// import filter from "lodash.filter"

// const Search = () => {
//   const[isLoading,setIsLoading]=useState(false);
//   const[data,setData]=useState([]);
//   const[error,setError]=useState(null);
//   const[fullData,setFullData]=useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   useEffect(()=>{
//     setIsLoading(true);
//     fetchData("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")//add your api name here
//   },[]);

//   const fetchData=async(url)=>{
//     try{
//       const response=await fetch(url);
//       const json=await response.json();
//       setData(json.results);
//       setFullData(json.results);
//       setIsLoading(false);
//     }
//     catch(error){
//       setError(error);
//       setIsLoading(false);
//     }
//   }

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     const formattedQuery=query.toLowerCase();
//     const filteredData=filter(fullData,(user)=>{return contains(user,formattedQuery);
//     });
//     setData(filteredData);
//   };

//   const contains=({name},query)=>{
//     if(
//       name.includes(query)
//     ){return true;
//     }
//     return false;
//   }

//   if(isLoading){
//     return(
//       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}  >
//         <ActivityIndicator size={"large"} color="#5500dc" />
//         </View>
//     );
//   }

//   if(error){
//     return(
//       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//         <Text>
//           error in fetching data...please check your connection!
//           </Text>
//           </View>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
//       <TextInput
//         style={styles.searchBox}
//         placeholder="Search"
//         clearButtonMode="always"
//         autoCapitalize='none'
//         autoCorrect={false}
//         value={searchQuery}
//         onChangeText={(query) => handleSearch(query)}
        
//       />

//       <FlatList 
//       data={data} 
//       keyExtractor={(item)=>item.data.id} 
//       renderItem={({item})=>(
//         <View style={styles.itemContainer}>
        
//           <Image source={{uri:item.image_path}}  style={styles.image}  />
//           <View>
//             <Text style={styles.textName}>{item.data.name}</Text>
          
          
//             </View>
        
        
//           </View>


//       )}
//       />
//     </SafeAreaView>
//   )
// }

// export default Search;

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     // backgroundColor: "#fff",
//     // alignItems: "center",
//     // justifyContent: "center"
//   },searchBox:{
//     paddingHorizontal: 20,
//           paddingVertical: 10,
//           borderColor: "#ccc",
//           borderWidth: 1,
//           borderRadius: 8,
//           marginTop:5

//   },
//   itemContainer:{
//     flexDirection:'row',
//     alignItems:'center',
//     marginLeft:10,
//     marginTop:10,
//   },
//   image:{
//     width:50,
//     height:50,
//     borderRadius:25,
//   },
//   textName:{
//     fontSize:17,
//     marginLeft:10,
//     fontWeight:"600"
//   }
// });