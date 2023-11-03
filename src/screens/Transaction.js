

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList } from 'react-native';
import Header from '../common/Header';
import { Table, Row } from 'react-native-table-component';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';



const Transaction = ({ navigation }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [AllSubscribedPlan, setAllSubscribedPlan] = useState(null);
  const { userToken } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');

  const state = {
    tableHead: ['Plan Name', 'Amount', 'Data'],
    widthArr: [200, 200, 200],
  };


  // =================  for table view ============================
  useEffect(() => {
    // Fetch AllSubscribedPlan data
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
    
    const plan =  item.subscription_plan.name.toLowerCase();
    const query = searchQuery.toLowerCase();
    return plan.includes(query) ;
  })
  .map((item) => [
    item.subscription_plan.name,
    item.amount,
    formatDate(item.created_at),
  ]) : [];




  return (
    <View style={{ flex: 1 }}>
      <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/menu.png')}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <ScrollView>
        <Text style={{
          fontFamily: 'Philosopher-Bold',
          fontSize: 27,
          fontWeight: '600',
          color: '#000',
          textAlign: 'center',
          marginTop: 20
        }}>Transaction</Text>
        <View style={{
          marginTop: 10,
          width: 150,
          height: 2,
          backgroundColor: '#c27b7f',
          alignItems: 'center',
          marginLeft: 130,
        }}></View>
        <View style={{
          backgroundColor: '#fff3cd',
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
          </View>
 {/* ===================================================================== */}    
      

          {/* table */}
          <View style={{ flex: 1, backgroundColor: '#fff3cd', marginTop: 15 }}>
            <ScrollView horizontal={true} contentContainerStyle={{ columnGap: 50 }}>
              <View style={{ backgroundColor: '#fff', marginTop: 15, marginLeft: 15, marginRight: 15 }}>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
                  <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={{ textAlign: 'center', fontWeight: 'bold', color: '#000' }} />
                </Table>
                <ScrollView style={styles.dataWrapper}>
                  <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
                    {updatedTableData.map((item, index) => (
                      <Row
                        key={index}
                        data={item}
                        widthArr={state.widthArr}
                        style={[styles.row, index % 2 && { backgroundColor: '#fff' }]}
                        textStyle={styles.text}
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
};

export default Transaction;
const styles = StyleSheet.create({
  container: { flex: 1, padding: 17, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#fff', fontWeight: 'bold' },
  text: { textAlign: 'center', fontWeight: '400', fontSize: 15 },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#fff' },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
  },

  searchIcon: {
    marginRight: 27,
  },
  searchInput: {
    fontSize: 15,
  },
  searchcontainer: {
    marginTop:10,
    marginLeft:10,
    padding: 5,
    width: '70%',
    height: 50,
    backgroundColor: '#fff3cd'
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'gray',
    paddingHorizontal: 12,

  },
}); 