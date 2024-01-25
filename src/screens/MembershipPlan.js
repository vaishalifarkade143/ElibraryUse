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







import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import Header from '../common/Header';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';
import RazorpayCheckout from 'react-native-razorpay';
const MembershipPlan = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [subscript, setSubscript] = useState([]);
  const navigation = useNavigation();
  const { userInfo, userToken } = useContext(AuthContext);
  const [isPlanActivated, setIsPlanActivated] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

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
  console.log("data is :", subscript);



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
        name: 'Gaurav Kumar'
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
              {/* <View style={[styles.dividerView, { width: 150, marginLeft: 90 }]}></View> */}
              <Text style={styles.sectionHeading1}>We've Got a Plan For You Choose Your Plan</Text>
              <FlatList
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                numColumns={2}
                data={subscript}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.planContainer}>
                    <Text style={styles.planName}>{item.name}</Text>
                    <View style={styles.priceContainer}>
                      <Image source={require('../images/rupee.png')} style={styles.rupeeIcon} />
                      <Text style={styles.price}>{item.price}</Text>

                      {item.id === 8 ? (
                        <Text style={styles.priceLabel}>/</Text>
                      ) : (item.id === 1 ? (
                        <Text style={styles.priceLabel}>/yearly</Text>
                      ) : (item.id === 9 ? (
                        <Text style={styles.priceLabel}>/</Text>
                      ) : (item.id === 10 ? (
                        <Text style={styles.priceLabel}>/Monthly</Text>
                      ) : (item.id === 11 ? (
                        <Text style={styles.priceLabel}>/yearly</Text>
                      ) 
                      : (
                        <Text style={styles.loadingText}>Loading...</Text>
                      )))))}
                     

                    </View>

                    <Text style={[styles.price, { textAlign: 'center' }]}>+</Text>
                    <View style={styles.priceContainer}>
                      <Image source={require('../images/rupee.png')} style={styles.rupeeIcon} />
                      <Text style={styles.price}>{item.deposit}</Text>
                      <Text style={styles.price}> Deposite</Text>
                    </View>
                    <Text style={styles.description}>{item.description}</Text>
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
                  </View>
                )}
              />
            </View>
          </View>
        );
      }}
    </Theme>
  );
};

export default MembershipPlan;

