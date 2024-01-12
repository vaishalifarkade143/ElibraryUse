

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList } from 'react-native';
import Header from '../common/Header';
import { Table, Row } from 'react-native-table-component';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';


const Transaction = ({ navigation }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [AllSubscribedPlan, setAllSubscribedPlan] = useState(null);
  const {userInfo, userToken } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');

  const state = {
    tableHead: ['Plan Name', 'Amount', 'Data'],
    widthArr: [200, 200, 200],
  };


  // =================  for table view ============================
  useEffect(() => {
    // Fetch AllSubscribedPlan data
    if (userToken !== null && userInfo.data.user.membership_plan_name !== null) {
      const apiUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/get-member-transactions';

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
    .map((item) => [
      item.subscription_plan.name,
      item.amount,
      formatDate(item.created_at),
    ]) : [];




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
            <ScrollView>
              <Text style={styles.sectionHeading}>Transaction</Text>
              <View style={[styles.dividerView, { width: 110, marginLeft: 130, }]}></View>
              <View style={{
                backgroundColor: '#f5ebe6',
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
                {/* ===================================================================== */}


                {/* table */}
                <View style={{ flex: 1, backgroundColor: '#f5ebe6', marginTop: 15 }}>
                  <ScrollView horizontal={true} contentContainerStyle={{ columnGap: 50 }}>
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
                  </ScrollView>
                </View>


              </View>



            </ScrollView>

          </View>
        );
      }}
    </Theme>

  );
};

export default Transaction;
