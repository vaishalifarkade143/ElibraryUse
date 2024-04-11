import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Header from '../common/Header';
import { Table, Row } from 'react-native-table-component';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import RazorpayCheckout from 'react-native-razorpay';

const MembershipScreen = ({ navigation }) => {
  const [AllSubscribedPlan, setAllSubscribedPlan] = useState(null);
  const [singleSubscribedPlan, setSingleSubscribedPlan] = useState(null);
  const { userToken, } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');


  const [checkedBookItems, setCheckedBookItems] = useState(false);
  const [checkedLibraryItems, setCheckedLibraryItems] = useState(false);
  const [checkedEbookItems, setCheckedEbookItems] = useState(false);

  const [isPlanUpdateded, setIsPlanUpdateded] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [updatedPlan, setUpdatedPlan] = useState(null);


  // =================  for single data view ============================

  useEffect(() => {
    const fetchSinglePlan = () => {
      const singleUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/membership-details';

      fetch(singleUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((res) => {
          setSingleSubscribedPlan(res.data);
          setIsLoading(false); // Data has been loaded
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setIsLoading(false); // Handle error and set isLoading to false

        });
    };
    fetchSinglePlan();
  }, []);



  useEffect(() => {
    if (userToken !== null && singleSubscribedPlan) {
      const apiUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/get-member-transactions?order_by=created_at&direction=desc&limit=10&skip=0';

      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log('AllSubscribedPlan Subscribed Plan Data:', data.data);
          setAllSubscribedPlan(data.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [userToken, singleSubscribedPlan]);

  //-----------------for convertion of date to personalized style date ----------------------------
  function formatDate(inputDate) {

    const inputDateObj = new Date(inputDate);


    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];


    const day = inputDateObj.getDate();
    const month = monthNames[inputDateObj.getMonth()];
    const year = inputDateObj.getFullYear();


    let daySuffix;
    if (day >= 11 && day <= 13) {
      daySuffix = 'th';
    } else {
      switch (day % 10) {
        case 1:
          daySuffix = 'st';
          break;
        case 2:
          daySuffix = 'nd';
          break;
        case 3:
          daySuffix = 'rd';
          break;
        default:
          daySuffix = 'th';
      }
    }


    const formattedDate = `${day}${daySuffix} ${month}, ${year}`;

    return formattedDate;
  }


  const formattedDate = singleSubscribedPlan ? formatDate(singleSubscribedPlan.start_date) : null;
  const formattedDate1 = singleSubscribedPlan ? formatDate(singleSubscribedPlan.end_date) : null;
  const ebook_date = singleSubscribedPlan ? formatDate(singleSubscribedPlan.ebook_status_created_at) : null;
  const book_date = singleSubscribedPlan ? formatDate(singleSubscribedPlan.book_status_created_at) : null;
  const library_date = singleSubscribedPlan ? formatDate(singleSubscribedPlan.library_status_created_at) : null;

  const updatedTableData = AllSubscribedPlan ? AllSubscribedPlan
    .filter((item) => {

      const plan = item.subscription_plan.name.toLowerCase();
      const query = searchQuery.toLowerCase();
      return plan.includes(query);
    })
    .map((item) => ({
      subscription_plan: item.subscription_plan.name,
      amount: item.subscription_plan.price,
      created_at: formatDate(item.created_at),
      plan_id: item.plan_id

    }))
    : [];



  const renderItem = ({ item }) => (
    <View style={styles.flatListItemContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.subscriptionPlan}>{item.subscription_plan}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Image source={require('../images/rupee.png')}
          style={{
            marginTop: 5,
            width: 12,
            height: 15,
            textAlign: 'center'
          }} />
        <Text style={styles.flatListItemText}>{item.amount}</Text>
        {item.plan_id === 6 ? (
          <Text style={styles.priceLabel}>/Yearly</Text>
        ) : (item.plan_id === 1 ? (
          <Text style={styles.priceLabel}>/LifeTime</Text>
        ) : (item.plan_id === 2 ? (
          <Text style={styles.priceLabel}>/Lifetime</Text>
        ) : (item.plan_id === 3 ? (
          <Text style={styles.priceLabel}>/Lifetime</Text>
        ) : (item.plan_id === 4 ? (
          <Text style={styles.priceLabel}>/Monthly</Text>
        ) : (item.plan_id === 5 ? (
          <Text style={styles.priceLabel}>/Monthly</Text>
        )
          : (
            <Text style={styles.loadingText}>Loading...</Text>
          ))))))}

      </View>
      <Text style={styles.flatListItemText1}>{item.created_at}</Text>

    </View>
  );

  // ===========================update plan=====================
  handleUpdatedPayment = (plan) => {
    let totalAmount = 0// Initialize totalAmount with the base price of the selected plan

    console.log("singleSubscribedPlan planid is :", singleSubscribedPlan.plan_id)
    if (singleSubscribedPlan.plan_id === 2) {
      if (checkedLibraryItems && checkedEbookItems) {
        totalAmount += 300 + 500;
      } else if (checkedLibraryItems) {
        totalAmount += 300;
      } else if (checkedEbookItems) {
        totalAmount += 500;
      }
    }

    if (singleSubscribedPlan.plan_id === 3) {
      if (checkedLibraryItems && checkedEbookItems) {
        totalAmount += 300 + 500;
      } else if (checkedLibraryItems) {
        totalAmount += 300;
      } else if (checkedEbookItems) {
        totalAmount += 500;
      }
    }

    if (singleSubscribedPlan.plan_id === 4) {
      if (checkedBookItems && checkedEbookItems) {
        totalAmount += 370 + 500;
      } else if (checkedBookItems) {
        totalAmount += 370;
      } else if (checkedEbookItems) {
        totalAmount += 500;
      }
    }

    if (singleSubscribedPlan.plan_id === 5) {
      if (checkedBookItems && checkedLibraryItems) {
        totalAmount += 370 + 300;
      } else if (checkedBookItems) {
        totalAmount += 370;
      } else if (checkedLibraryItems) {
        totalAmount += 300;
      }
    }

    if (singleSubscribedPlan.plan_id === 6) {
      if (checkedEbookItems && checkedLibraryItems) {
        totalAmount += 500 + 300;
      } else if (checkedEbookItems) {
        totalAmount += 500;
      } else if (checkedLibraryItems) {
        totalAmount += 300;
      }
    }

    console.log("amount is :", totalAmount)
    const options = {
      description: 'Credits towards consultation',
      image: require('../images/Logoelibrary.png'),
      currency: 'INR',
      key: 'rzp_test_iGWfBKpv8IcFlF',
      amount: totalAmount * 100, // Amount should be in paisa (multiply by 100)
      name: 'Nagpur Elibrary',
      order_id: '',
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Nagpur Elibrary'
      },
      theme: { color: '#3498DB' }
    };

    RazorpayCheckout.open(options)
      .then(data => {
        setPaymentSuccess(true);
        setUpdatedPlan(plan)
        // setSelectedPlan(selectedPlan);
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        alert(`Error: ${error.code} | ${error.description}`);
      });
  }

  // ==================================== after plan update  POST req call =========================

  const updatePlan = (item) => {
    if (item) {
      const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/create-membership-payment-session4/${item.id}`;
      console.log("after updating plan id::", item.id)
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
          setIsPlanUpdateded(true);
          navigation.navigate('membershipscreen');

        })
        .catch((error) => {
          console.error('Error storing data:', error);
        });
    }
  };
  useEffect(() => {
    if (paymentSuccess) {
      updatePlan(updatedPlan);
    }
  }, [paymentSuccess, updatedPlan]);


  return (
    <Theme>
      {({ theme }) => {
        const styles = getStyles(theme);
        return (
          <View style={styles.container}>
            {/* <Header
              rightIcon={require('../images/Logoelibrary.png')}
              leftIcon={require('../images/menu.png')}
              onClickLeftIcon={() => {
                navigation.openDrawer();
              }}
            /> */}
            <Text style={styles.sectionHeading}>Membership Plan</Text>

            {singleSubscribedPlan ?
              (isLoading ? (<ActivityIndicator style={{
                justifyContent: 'center',
                alignItems: 'center'
              }} size="large" color="#c27b7f" />) :
                (
                  <View >
                    <View style={{
                      marginTop: 20,
                      marginBottom: 50,
                      paddingBottom: 20,
                      marginLeft: 20,
                      marginRight: 20,
                      backgroundColor: '#f5e0e1',
                      borderRadius: 8
                    }}>
                      {singleSubscribedPlan.plan_id === 6 ?
                        (<Text style={styles.planName}>Regular Membership</Text>) :
                        (singleSubscribedPlan.plan_id === 1 ?
                          (<Text style={styles.planInScreen}>BPL Card Holder</Text>) :
                          (singleSubscribedPlan.plan_id === 2 ?
                            (<Text style={styles.planInScreen}>Family Plan (4 Member)</Text>) :
                            (singleSubscribedPlan.plan_id === 3 ?
                              (<Text style={styles.planInScreen}>Lifetime membership</Text>)
                              :
                              (singleSubscribedPlan.plan_id === 4 ?
                                (<Text style={styles.planInScreen}>Library Access </Text>) :
                                (singleSubscribedPlan.plan_id === 5 ?
                                  (<Text style={styles.planInScreen}>E-Book Access</Text>)
                                  : (
                                    <Text style={styles.loadingText}>Loading...</Text>
                                  ))))))}

                      {singleSubscribedPlan.plan_id === 1 ? (<Text style={{
                        paddingTop: 5,
                        fontSize: 15,
                        fontFamily: 'Poppins-Regular',
                        color: '#2f4858', paddingLeft: 20,
                      }}>Active till Lifetime .</Text>) :
                        (<Text style={{
                          paddingTop: 5,
                          fontSize: 15,
                          fontFamily: 'Poppins-Regular',
                          color: '#2f4858', paddingLeft: 20,
                        }}>Active till:  {formattedDate1}  </Text>)}

                      <View style={{
                        flexDirection: 'row',
                        paddingTop: 10,
                        paddingLeft: 20,
                      }}>
                        <Image source={require('../images/rupee.png')}
                          style={{
                            width: 18,
                            height: 17,
                          }} />

                        <Text style={{
                          color: 'black',
                          marginTop: -10,
                          fontSize: 25,
                          fontFamily: 'Poppins-Regular',

                        }}>{singleSubscribedPlan.subscription_plan.price}</Text>


                        {/* =============================================================================================== */}


                        {singleSubscribedPlan.plan_id === 6 ? (<Text style={{
                          marginTop: -1,
                          fontSize: 15,
                          fontFamily: 'Poppins-Regular',
                          textAlign: 'center',
                          color: '#2f4858'
                        }}>/Yearly</Text>) :
                          (singleSubscribedPlan.plan_id === 1 ? (<Text style={{
                            marginTop: -1,
                            fontSize: 15,
                            fontFamily: 'Poppins-Regular',
                            textAlign: 'center',
                            color: '#2f4858'
                          }}>/LifeTime</Text>) :
                            (singleSubscribedPlan.plan_id === 2 ? (<Text style={{
                              marginTop: -1,
                              fontSize: 15,
                              fontFamily: 'Poppins-Regular',
                              textAlign: 'center',
                              color: '#2f4858'
                            }}>/Lifetime</Text>) :
                              (singleSubscribedPlan.plan_id === 3 ? (<Text style={{
                                marginTop: -1,
                                fontSize: 15,
                                fontFamily: 'Poppins-Regular',
                                textAlign: 'center',
                                color: '#2f4858'
                              }}>/Lifetime</Text>) :
                                (singleSubscribedPlan.plan_id === 4 ? (<Text style={{
                                  marginTop: -1,
                                  fontSize: 15,
                                  fontFamily: 'Poppins-Regular',
                                  textAlign: 'center',
                                  color: '#2f4858'
                                }}>/Monthly</Text>) :
                                  (singleSubscribedPlan.plan_id === 5 ? (<Text style={{
                                    marginTop: -1,
                                    fontSize: 15,
                                    fontFamily: 'Poppins-Regular',
                                    textAlign: 'center',
                                    color: '#2f4858'
                                  }}>/Monthly</Text>)
                                    : (
                                      <Text style={styles.loadingText}>Loading...</Text>
                                    ))))))}
                        {/* ======================================================================= */}

                      </View>

                      <Text style={{
                        paddingLeft: 20,
                        fontFamily: 'Poppins-Regular',
                        color: '#2f4858', marginBottom: 6,
                      }}>Subscribed Date:{formattedDate}</Text>
                      <Text style={{
                        paddingLeft: 20,
                        fontFamily: 'Poppins-Regular',
                        color: '#2f4858'
                      }}>Current Plan Have :</Text>



                      {singleSubscribedPlan.book_status !== null ?
                        (<View style={{ flexDirection: 'row' }}>
                          <AntDesign name="checkcircle" color={"#3498DB"} size={15} style={{ marginTop: 3, paddingLeft: 17, }} />
                          <Text style={{
                            fontFamily: 'Poppins-Regular',
                            color: '#000'
                          }}>Access of Books Active till {book_date}</Text>
                        </View>) : (<View style={{ flexDirection: 'row' }}>
                          <CheckBox
                            tintColors={{ true: '#3498DB', false: 'gray' }}
                            disabled={false}
                            value={checkedBookItems}
                            onValueChange={(newValue) => setCheckedBookItems(newValue)}
                            style={{
                              marginLeft: 10
                            }}
                          />
                          <Text style={{
                            fontFamily: 'Poppins-Regular',
                            color: '#000'
                          }}>Access of Books Active </Text>
                        </View>)
                      }

                      {singleSubscribedPlan.ebook_status !== null ?
                        (<View style={{ flexDirection: 'row' }}>
                          <AntDesign name="checkcircle" color={"#3498DB"} size={15} style={{ marginTop: 3, paddingLeft: 17, }} />
                          <Text style={{
                            fontFamily: 'Poppins-Regular',
                            color: '#000',
                          }}>Access of EBooks Active till {ebook_date}</Text>
                        </View>) : (<View style={{ flexDirection: 'row' }}>
                          <CheckBox
                            tintColors={{ true: '#3498DB', false: 'gray' }}
                            disabled={false}
                            value={checkedEbookItems}
                            onValueChange={(newValue) => setCheckedEbookItems(newValue)}
                            style={{
                              marginLeft: 10
                            }}
                          />
                          <Text style={{
                            fontFamily: 'Poppins-Regular',
                            color: '#000',
                            marginTop: 5
                          }}>Access of Ebook (₹ 500 / Monthly)</Text>
                        </View>)
                      }

                      {singleSubscribedPlan.library_status !== null ?
                        (<View style={{ flexDirection: 'row' }}>
                          <AntDesign name="checkcircle" color={"#3498DB"} size={15} style={{ marginTop: 3, paddingLeft: 17, }} />
                          <Text style={{
                            fontFamily: 'Poppins-Regular',
                            color: '#000'
                          }}>Access of Library Active till {library_date}</Text>
                        </View>) : (<View style={{ flexDirection: 'row' }}>
                          <CheckBox
                            tintColors={{ true: '#3498DB', false: 'gray' }}
                            disabled={false}
                            value={checkedLibraryItems}
                            onValueChange={(newValue) => setCheckedLibraryItems(newValue)}
                            style={{
                              marginLeft: 10
                            }}
                          />
                          <Text style={{
                            fontFamily: 'Poppins-Regular',
                            color: '#000',
                            marginTop: 5
                          }}>Access of Library (₹ 300 / Monthly) </Text>
                        </View>)
                      }

                      {/* {console.log("book_staus is::", singleSubscribedPlan.book_status)}
                      {console.log("library_status is::", singleSubscribedPlan.library_status)}
                      {console.log("ebook_status is::", singleSubscribedPlan.ebook_status)} */}



                      {singleSubscribedPlan.plan_id === 1 ?
                        (<View></View>)
                        : (<View style={{ justifyContent: 'center', width: 108, marginLeft: 20 }}>
                          <TouchableOpacity
                            onPress={() => {
                              handleUpdatedPayment();
                              // navigation.navigate('MembershipPlan')
                            }}>
                            <Text style={
                              {
                                padding: 8,
                                backgroundColor: '#c27b7f',
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: "#fff",
                                borderRadius: 5,
                              }
                            }>Upgrade Plan</Text>
                          </TouchableOpacity>
                        </View>)}


                    </View>
                    <Text style={[styles.sectionHeading, { marginTop: -30 }]}>Transaction</Text>
                    <View style={{
                      flexDirection: 'column',
                      marginBottom: 50,
                      paddingBottom: 10,
                    }}>

                      {/* =================search============= */}
                      <View style={styles.searchBar}>
                        <Feather name="search" color={"gray"} size={20} style={styles.searchIcon} />
                        <TextInput
                          style={styles.searchInput}
                          placeholderTextColor="#000"
                          placeholder="Search by Plan Name "
                          value={searchQuery}
                          onChangeText={setSearchQuery}
                        />

                        {searchQuery !== '' && (
                          <TouchableOpacity onPress={() => {
                            setSearchQuery('');

                          }}>
                            <Feather name="x" color={"gray"} size={20} style={styles.searchIcon} />
                          </TouchableOpacity>)}
                      </View>

                      <FlatList
                        data={updatedTableData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                      />
                    </View>
                  </View>
                )) : (<View style={{
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  marginLeft: 10,
                  marginRight: 10,
                  paddingBottom: 30,
                  paddingTop: 30
                }}>
                  <Text style={{ fontSize: 15, fontFamily: 'Philosopher-Bold' }}>
                    Please Activate Any Subscription plan
                  </Text>
                </View>)}

          </View>
        );
      }}
    </Theme>
  );
};

export default MembershipScreen;

const styles = StyleSheet.create({

  flatListItemContainer: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 8,
    margin: 10,
    height: 90,
    backgroundColor: '#f5e0e1',
    justifyContent: 'center',
    paddingLeft: 12
  },
  subscriptionPlan: {
    color: '#333',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
  flatListItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: '#000'
  },
  flatListItemText1: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: 'grey'
  },
  priceLabel: {
    color: '#555',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginTop: 4
  },

});