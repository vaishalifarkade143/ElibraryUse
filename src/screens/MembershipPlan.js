// import React, { useEffect, useState, useContext } from 'react';
// import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { AuthContext } from '../context/AuthContext';
// import Header from '../common/Header';
// import getStyles from '../Style/logNRegStyle';
// import Theme from './Theme';

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
//         return response.json();
//       })
//       .then((responseData) => {
//         setIsPlanActivated(true);
//         navigation.navigate('MembershipScreen');
//       })
//       .catch((error) => {
//         console.error('Error storing data:', error);
//       });
//   };

//   return (
//     <Theme>
//     {({ theme }) => {
//       const styles = getStyles(theme);
//       return (
//     <View style={styles.container}>
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
//         <View style={[styles.dividerView,{ width: 150, marginLeft: 90,}]}></View>
//         <Text style={styles.sectionHeading1}>We've Got a Plan For You Choose Your Plan</Text>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContainer}
//         >
//           {subscript.map((item) => (
//             <View key={item.id} style={styles.planContainer}>

//               <Text style={styles.planName}>{item.name}</Text>
//               <View style={styles.priceContainer}>
//               <Image source={require('../images/rupee.png')} style={styles.rupeeIcon} />
//                 <Text style={styles.price}>{item.price}</Text>
//                 <Text style={styles.priceLabel}>/year</Text>
//               </View>
//               <Text style={styles.description}>{item.description}</Text>
//               <TouchableOpacity
//                 disabled={isPlanActivated}
//                 onPress={() => {
//                   activatePlan(item);
//                   setIsPlanActivated(true);
//                 }}
//                 style={styles.subscribeButton}
//               >
//                 <Text style={styles.buttonText}>Subscribe Now</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//     </View>
//      );
//     }}
//   </Theme>
//   );
// };

// export default MembershipPlan;





//==================================animation added=====================================

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import Header from '../common/Header';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';
import RazorpayCheckout from 'react-native-razorpay';
import CheckBox from '@react-native-community/checkbox';
import Animated, {
  useSharedValue,
  withSpring,
  Easing,
  useAnimatedStyle,
  withDelay,
} from 'react-native-reanimated';


const MembershipPlan = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [subscript, setSubscript] = useState([]);
  const navigation = useNavigation();
  const { userInfo, userToken } = useContext(AuthContext);
  const [isPlanActivated, setIsPlanActivated] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [defaultCheckedBookItems, setDefaultCheckedBookItems] = useState({ 1: true, 6: true, 3: true, 2: true });
  const [checkedBookItems, setCheckedBookItems] = useState(defaultCheckedBookItems);

  const [defaultCheckedLibraryItems, setDefaultCheckedLibraryItems] = useState({ 1: true, 4: true, });
  const [checkedLibraryItems, setCheckedLibraryItems] = useState(defaultCheckedLibraryItems);

  const [defaultCheckedEbookItems, setDefaultCheckedEbookItems] = useState({ 1: true, 5: true });
  const [checkedEbookItems, setCheckedEbookItems] = useState(defaultCheckedEbookItems);

  // const initialOffset = 300;
  const opacity = useSharedValue(20);

  const startAnimation = () => {
    opacity.value = withSpring(1, { damping: 4, stiffness: 50 });
  };

  const animatedItemStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: opacity.value * 10 }],
    };
  });

  useEffect(() => {
    startAnimation(); // Trigger the animation when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once


  useEffect(() => {
    const subscription = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/membership-plans")
        .then(res => res.json())
        .then(responce => {
          setSubscript(responce.data);

          // console.log("data:",responce.data[0].price);
          // setPrice(responce.data.price);
          setIsLoaded(false);
        });
    };
    subscription();
  }, []);
  console.log("data is subscript:", subscript);



  const activatePlan = (item) => {
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


  const handlepayment = (selectedPlan) => {
    var options = {
      description: 'Credits towards consultation',
      image: require('../images/Logoelibrary.png'),
      currency: 'INR',
      key: 'rzp_test_iGWfBKpv8IcFlF',
      amount: selectedPlan.price * 100,
      name: 'Nagpur Elibrary',
      order_id: '',//Replace this with an order_id created using Orders API.
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Nagpur Elibrary'
      },
      theme: { color: '#3498DB' }

    }
    console.log("amount is: ", options.amount);

    RazorpayCheckout.open(options).then((data) => {
      setPaymentSuccess(true);
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    });
  }

  useEffect(() => {
    if (paymentSuccess) {
      // If payment was successful, activate the plan
      activatePlan(selectedPlan);
    }
  }, [paymentSuccess]);

  return (
    <Theme>
      {({ theme }) => {
        const styles = getStyles(theme);
        return (
          <View style={styles.container}>
            <Header
              middleIcon={require('../images/Logoelibrary.png')}
              leftIcon={require('../images/menu.png')}
              onClickLeftIcon={() => {
                navigation.openDrawer();
              }}
            />
            <View style={styles.body}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>LIBRARY</Text>
                <Text style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 24,
                  marginBottom: 10,
                  color: theme === 'LIGHT' ? '#000' : '#fff',
                  textAlign: 'center'
                }}>Membership Plan</Text>
              </View>


              <View style={{ marginBottom: 50 }}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  numColumns={1}
                  data={subscript.slice(1)}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) =>
                  (
                    <Animated.View style={[styles.animatedItem, animatedItemStyle]}>
                    <View style={{backgroundColor:'#3498DB', borderTopRightRadius:20, padding:10}}>
                    <Text style={styles.planName}>{item.name}</Text>
                    </View>
                    <View style={styles.planContainer}>
                    
                      <View style={styles.priceContainer}>
                        <Image source={require('../images/rupee.png')} style={styles.rupeeIcon} />
                        <Text style={styles.price}>{item.price}</Text>


                        {item.id === 6 ? (
                          <Text style={styles.priceLabel}>/Yearly</Text>
                        ) : (item.id === 1 ? (
                          <Text style={styles.priceLabel}>/LifeTime</Text>
                        ) : (item.id === 2 ? (
                          <Text style={styles.priceLabel}>/Lifetime</Text>
                        ) : (item.id === 3 ? (
                          <Text style={styles.priceLabel}>/Lifetime</Text>
                        ) : (item.id === 4 ? (
                          <Text style={styles.priceLabel}>/Monthly</Text>
                        ) : (item.id === 5 ? (
                          <Text style={styles.priceLabel}>/Monthly</Text>
                        )
                          : (
                            <Text style={styles.loadingText}>Loading...</Text>
                          ))))))}

                        <Text style={[styles.price, { textAlign: 'center' }]}>  +  </Text>
                        <Image source={require('../images/rupee.png')} style={styles.rupeeIcon} />
                        <Text style={styles.price}>{item.deposit}</Text>
                        <Text style={styles.priceLabel}> Deposite</Text>
                      </View>

                      <Text style={styles.description}>{item.description}</Text>

                      <View style={{ flexDirection: 'row',alignItems:'center',justifyContent:'center', }}>

                        <CheckBox
                          tintColors={{ true: '#3498DB', false: 'gray' }}
                          value={checkedBookItems[item.id]}

                          onValueChange={() => {
                            // Update only if it's not a default selected checkbox
                            if (!defaultCheckedBookItems.hasOwnProperty(item.id)) {
                              setCheckedBookItems((prevCheckedItems) => ({
                                ...prevCheckedItems,
                                [item.id]: !prevCheckedItems[item.id],
                              }));
                            }
                          }}
                          style={{
                            marginLeft: -120,
                          }}
                        />
                        <Text style={{
                          alignSelf: 'center', fontSize: 12,
                          fontFamily: 'Poppins-Regular',
                        }}>Access of Book</Text>
                      </View>

                      <View style={{ flexDirection: 'row',alignItems:'center',justifyContent:'center', }}>
                        <CheckBox
                          tintColors={{ true: '#3498DB', false: 'gray' }}
                          value={checkedLibraryItems[item.id]}
                          onValueChange={() => {
                            // Update only if it's not a default selected checkbox
                            if (!defaultCheckedLibraryItems.hasOwnProperty(item.id)) {
                              setCheckedLibraryItems((prevCheckedItems) => ({
                                ...prevCheckedItems,
                                [item.id]: !prevCheckedItems[item.id],
                              }));
                            }
                          }}
                          style={{
                            marginLeft: item.id === 2 || item.id === 3 || item.id === 5 || item.id === 6 ? -5 : -110
                          }}
                        />
                        {item.id === 2 || item.id === 3 || item.id === 5 || item.id === 6 ?
                          (<Text style={{
                            fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                          }}>Access of Library(₹ 500 / Monthly)</Text>)
                          :
                         ( <Text style={{
                          
                            fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                           
                          }}>Access of Library</Text>)}
                      </View>

                      <View style={{ flexDirection: 'row',alignItems:'center',justifyContent:'center',marginBottom:10 }}>
                        <CheckBox
                          tintColors={{ true: '#3498DB', false: 'gray' }}
                          value={checkedEbookItems[item.id]}

                          onValueChange={() => {
                            // Update only if it's not a default selected checkbox
                            if (!defaultCheckedEbookItems.hasOwnProperty(item.id)) {
                              setCheckedEbookItems((prevCheckedItems) => ({
                                ...prevCheckedItems,
                                [item.id]: !prevCheckedItems[item.id],
                              }));
                            }
                          }}

                          style={{
                             marginLeft: item.id === 2 || item.id === 3 || item.id === 4 || item.id === 6 ? -10 : -112
                          }}
                        />
                        {item.id === 2 || item.id === 3 || item.id === 4 || item.id === 6 ?
                          <Text style={{
                            alignSelf: 'center',
                            fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                          }}>Access of Ebook(₹ 300 / Monthly)</Text>
                          :
                          <Text style={{
                             fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                          }}>Access of Ebook</Text>
                        }
                      </View>

                    </View>
                    <TouchableOpacity
                        disabled={isPlanActivated}
                        onPress={() => {
                          setSelectedPlan(item);
                          handlepayment(item);
                        }}
                        style={styles.subscribeButton}
                      >
                        <Text style={styles.buttonText}>Subscribe</Text>
                      </TouchableOpacity>
                    </Animated.View>
                  )
                  }

                />
              </View>

            </View>
          </View>
        );

      }}
    </Theme>
  );
};

export default MembershipPlan;

