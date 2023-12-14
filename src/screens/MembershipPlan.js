import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import Header from '../common/Header';

const MembershipPlan = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [subscript, setSubscript] = useState([]);
  const navigation = useNavigation();
  const { userInfo, userToken } = useContext(AuthContext);
  const [isPlanActivated, setIsPlanActivated] = useState(false);

  useEffect(() => {
    const subscription = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/membership-plans")
        .then(res => res.json())
        .then(responce => {
          setSubscript(responce.data);
          setIsLoaded(false);
        });
    };
    subscription();
  }, []);

  const activatePlan = (item) => {
    const data = userInfo.data.user;
    const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/create-membership-payment-session/${item.id}`;
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        setIsPlanActivated(true);
        navigation.navigate('MembershipScreen');
      })
      .catch((error) => {
        console.error('Error storing data:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/menu.png')}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <View style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LIBRARY</Text>
          <Text style={styles.sectionHeading}>Membership Plan</Text>
        </View>
        <View style={styles.separator}></View>
        <Text style={styles.sectionHeading1}>We've Got a Plan For You</Text>
        <Text style={styles.sectionHeading2}>Choose Your Plan</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {subscript.map((item) => (
            <View key={item.id} style={styles.planContainer}>
              
              <Text style={styles.planName}>{item.name}</Text>
              <View style={styles.priceContainer}>
              <Image source={require('../images/rupee.png')} style={styles.rupeeIcon} />
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.priceLabel}>/year</Text>
              </View>
              <Text style={styles.description}>{item.description}</Text>
              <TouchableOpacity
                disabled={isPlanActivated}
                onPress={() => {
                  activatePlan(item);
                  setIsPlanActivated(true);
                }}
                style={styles.subscribeButton}
              >
                <Text style={styles.buttonText}>Subscribe Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  section: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#c27b7f',
    fontWeight: 'bold',
  },
  sectionHeading: {
    fontFamily: 'Philosopher-Bold',
    fontSize: 28,
    fontWeight: '600',
    marginTop:10,
    color: '#000',
    marginBottom: 8,
    textAlign: 'center'
  },
  sectionHeading1: {
    fontFamily: 'Philosopher-Bold',
    fontSize: 28,
    fontWeight: '600',
    marginTop:25,
    color: '#000',
    marginBottom: 8,
    textAlign: 'center'
  },
  sectionHeading2: {
    fontFamily: 'Philosopher-Bold',
    fontSize: 28,
    fontWeight: '600',
    marginTop:10,
    color: '#000',
    marginBottom: 8,
    textAlign: 'center'
  },
  separator: {
    marginTop: 10,
    width: '100%',
    height: 2,
    backgroundColor: '#c27b7f',
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  planContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop:20,
    marginHorizontal: 10,
    padding: 20,
    elevation: 3,
    width: 260, 
    height: 300
  
  },
 
  planName: {
    marginTop:20,
    textAlign: 'center',
    fontFamily: 'Philosopher-Bold',
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
  },
  priceLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#c27b7f',
    marginVertical: 10,
  },
  subscribeButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#c27b7f',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: "#fff",
  },
  rupeeIcon: {
        width: 22,
        height: 20,
        marginRight: 5,
      },
});

export default MembershipPlan;



























// import React, { useEffect, useState, useContext } from 'react';

// import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Alert,ScrollView } from 'react-native';

// import { useNavigation } from '@react-navigation/native';
// import { AuthContext } from '../context/AuthContext';
// import Header from '../common/Header';


// const MembershipPlan = () => {
//   const [isLoaded, setIsLoaded] = useState(true);
//   const [subscript, setSubscript] = useState([]);
//   const navigation = useNavigation();
//   const { userInfo, userToken } = useContext(AuthContext);
//   const [isPlanActivated, setIsPlanActivated] = useState(false);

  
  
//   useEffect(() => {
//     const subscription = () => {
//       fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/membership-plans")
//         .then(res => res.json())
//         .then(responce => {
//           setSubscript(responce.data);
//           setIsLoaded(false);
//         });
//     };
//     subscription();
//   }, []);

  
  
//   const activatePlan = (item) => {

//     const data = userInfo.data.user;
//     // console.log(data);
//     const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/create-membership-payment-session/${item.id}`;
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userToken}`,
//       },
      
//     })

//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         // console.log("responce is:", response);
//         return response.json();
//       })

//       .then((responseData) => {
//         // console.log('Data stored successfully:', responseData);
//         setIsPlanActivated(true);
//         navigation.navigate('MembershipScreen');
//       })

//       .catch((error) => {
//         console.error('Error storing data:', error);
//       });
   
//   };
//  return (
//   <View style={styles.container}>
//       <Header
//         rightIcon={require('../images/Logoelibrary.png')}
//         leftIcon={require('../images/menu.png')}
//         onClickLeftIcon={() => {
//           navigation.openDrawer();

//         }}
//       />
//       <View style={styles.body}>
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>LIBRARY</Text>
//           <Text style={styles.sectionHeading}>Membership Plan</Text>
//         </View>
//         <View style={{
//           marginTop:10,
//           width: 150,
//           height: 1,
//           backgroundColor: '#c27b7f',
//           marginLeft:120
//         }}></View>
 
//         <View style={{
//           marginTop: 30,
//           backgroundColor: '#fff',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}>
//           <FlatList
//             keyExtractor={(item) => item.id}
//             data={subscript}
//             renderItem={({ item }) =>
//               <View style={{
//                 width: 182,
//                 height: 200,
//               }}>
//                 <Text style={{
//                   textAlign: 'center',
//                   fontFamily: 'Philosopher-Bold',
//                   fontSize: 25,
//                   fontWeight: '600',
//                   color: '#000',
//                 }}>{item.name}</Text>
//                 <View style={{
//                   flexDirection: 'row',
//                   justifyContent: 'center',
//                   alignItems: 'center'
//                 }}>
//                   <Image source={require('../images/rupee.png')}
//                     style={{
//                       width: 22, height: 20,
//                       marginLeft: 40,
//                       paddingTop: 5,
//                       marginTop: 12,
//                     }} />

//                   <Text style={{
//                     fontWeight: 'bold',
//                     color: 'black',
//                     paddingTop: 5,
//                     marginTop: 5,
//                     fontSize: 30,
//                   }}>{item.price} </Text>
//                   <Text style={{
//                     fontWeight: 'bold',
//                     marginRight: 40,
//                     paddingTop: 5,
//                     marginTop: 5,
//                     fontSize: 15,
//                   }}>/yearly</Text>
//                 </View>
//                 <Text style={{
//                   textAlign: 'center',
//                   fontWeight: 'bold',
//                   color: '#c27b7f',
//                   marginTop: 10,
//                   marginBottom: 10
//                 }}>{item.description}</Text>

//                 <TouchableOpacity disabled={isPlanActivated} onPress={() => {
//                   // Call activatePlan function to activate the plan
//                   activatePlan(item);
//                   setIsPlanActivated(true);

//                 }}>
//                   <Text style={{
//                     marginLeft: 15,
//                     marginRight: 15,
//                     paddingTop: 10,
//                     paddingBottom: 10,
//                     textAlign: 'center',
//                     backgroundColor: '#c27b7f',
//                     fontWeight: 'bold',
//                     fontSize: 15,
//                     color: "#fff", borderRadius: 8,
//                   }}>Subscribe</Text>
//                 </TouchableOpacity>
//               </View>
//             }
//           />
//         </View>
       
//       </View>
//     </View>

//   );
// };



// const styles = StyleSheet.create({

//   body: {
//     flex: 1,
//     padding: 20,
//   },
//   container: {
//     flex: 1,
//   },
//   section: {
//     alignItems: 'center',
//   },
//   sectionTitle: {
//     fontSize: 15,
//     color: '#c27b7f',
//     fontWeight: 'bold'
//   },
//   sectionHeading: {
//     fontFamily: 'Philosopher-Bold',
//     fontSize: 25,
//     fontWeight: '600',
//     color: '#000',
//   },

//   subscribeButton: {
//     padding: 10,
//     alignItems: 'center',
//     backgroundColor: '#c27b7f',
//     fontWeight: 'bold',
//     fontSize: 15,
//     color: "#fff"
//   },
// });


// export default MembershipPlan;

