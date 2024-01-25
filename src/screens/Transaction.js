

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList } from 'react-native';
import Header from '../common/Header';
import { Table, Row } from 'react-native-table-component';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Transaction = ({ navigation,route }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [AllSubscribedPlan, setAllSubscribedPlan] = useState(null);
  const { userInfo, userToken } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const Plan_exist= route.params.singleSubscribedPlan;
  console.log('transactionpage', Plan_exist);


  const state = {
    tableHead: ['Plan Name', 'Amount', 'Data'],
    widthArr: [200, 200, 200],
  };


  // =================  for table view ============================
  useEffect(() => {
    // Fetch AllSubscribedPlan data
    if (Plan_exist !== null) {
      const apiUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/get-member-transactions?order_by=created_at&direction=desc&limit=10&skip=0';

      fetch(apiUrl, {
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
        .then((data) => {
          setAllSubscribedPlan(data.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [userToken]);


  



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


    const updatedTableData = AllSubscribedPlan ? AllSubscribedPlan
    .filter((item) => {

      const plan = item.subscription_plan.name.toLowerCase();
      const query = searchQuery.toLowerCase();
      return plan.includes(query);
    })
    // .map((item) => [
    //   item.subscription_plan.name,
    //   item.amount,
    //   formatDate(item.created_at),
    // ])


    .map((item) => ({
      subscription_plan: item.subscription_plan.name,
      amount: item.amount,
      created_at: formatDate(item.created_at),
      plan_id: item.plan_id

    }))
    : [];

    const renderItem = ({ item }) => (
      <View style={styles.flatListItemContainer}>
  
        <View style={styles.columnContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.subscriptionPlan}>{item.subscription_plan}</Text>
          {/* <AntDesign name="star" color={"red"} size={20} style={{marginLeft:15}} /> */}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.flatListItemText}>{item.amount}</Text>
            {item.plan_id === 8 ? (
              <Text style={styles.priceLabel}>/Life Time</Text>
            ) : (item.plan_id === 1 ? (
              <Text style={styles.priceLabel}>/yearly</Text>
            ) : (item.plan_id === 9 ? (
              <Text style={styles.priceLabel}>/Life Time</Text>
            ) : (item.plan_id === 10 ? (
              <Text style={styles.priceLabel}>/Monthly</Text>
            ) : (item.plan_id === 11 ? (
              <Text style={styles.priceLabel}>/yearly</Text>
            )
              : (
                <Text style={styles.loadingText}>Loading...</Text>
              )))))}
  
          </View>
          <Text style={styles.flatListItemText1}>{item.created_at}</Text>
  
        </View>
      </View>
    );


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
            {/* <ScrollView> */}
              <Text style={styles.sectionHeading}>Transaction</Text>
              <View style={[styles.dividerView, { width: 110,  }]}></View>
              <View style={{
                // backgroundColor: '#f5ebe6',
                marginTop: 20,
                flexDirection: 'column',
                marginBottom: 50,
                paddingBottom: 20,
              }}>

                {/* ==================search======================= */}
                <View style={styles.searchcontainer}>
                  <View style={styles.searchBar}>
                    <Feather name="search" color={"gray"} size={20} style={styles.searchIcon} />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search by Plan Name"
                      placeholderTextColor="#000"
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                    />

                    {searchQuery !== '' && (
                      <TouchableOpacity onPress={() => {
                        setSearchQuery('');

                      }}>
                        <Feather name="x" color={"gray"} size={20} style={[styles.searchIcon, { marginLeft: 50 }]} />
                      </TouchableOpacity>)}
                  </View>
                </View>

                <FlatList
                        data={updatedTableData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                      />

                {/* table */}
                {/* <View style={{ flex: 1, marginTop: 15 }}>
                  {Plan_exist !== null ?

                    (<ScrollView horizontal={true} contentContainerStyle={{ columnGap: 50 }}>

                      <View style={{ backgroundColor: '#fff', marginTop: 15, marginLeft: 15, marginRight: 15 }}>
                        
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
                          <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header}
                            textStyle={{ textAlign: 'center', fontWeight: 'bold', color: '#000' }} />
                        </Table>



                        <ScrollView style={styles.dataWrapper}>
                          <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
                            {updatedTableData.map((item, index) => (
                              <Row
                                key={index}
                                data={item}
                                widthArr={state.widthArr}
                                style={[styles.row1, index % 2 && { backgroundColor: '#fff' }]}
                                textStyle={styles.texttt}
                              />
                            ))}
                          </Table>
                        </ScrollView>
                      </View>
                    </ScrollView> )
                    : (<View style={{
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
                </View> */}


              </View>



            {/* </ScrollView> */}

          </View>
        );
      }}
    </Theme>

  );
};

export default Transaction;
const styles = StyleSheet.create({

  flatListItemContainer: {
    backgroundColor: '#D7BDE2',
    borderRadius: 8,
    padding: 15,
    margin: 20,
    elevation: 2,
    height:120,
  },
  subscriptionPlan: {
    color: '#333',
    fontFamily: 'Philosopher-Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  flatListItemText:{
    fontFamily: 'Philosopher-Bold',
    fontSize: 18,
    color:'blue'
  },
  flatListItemText1:{
    fontFamily: 'Philosopher-Bold',
    fontSize: 15,
    color:'grey'
  },
  priceLabel: {
    color: '#555',
    fontFamily: 'Philosopher-Bold',
    fontSize: 14,
    marginTop:5
  },
  columnContainer: {
    alignItems: 'flex-start',
  },

});