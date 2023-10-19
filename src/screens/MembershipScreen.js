


import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList } from 'react-native';
import Header from '../common/Header';
import { Table, Row } from 'react-native-table-component';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';


const MembershipScreen = ({navigation }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [AllSubscribedPlan, setAllSubscribedPlan] = useState(null);
  const [singleSubscribedPlan, setSingleSubscribedPlan] = useState([]);
  const { userToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const state = {
    tableHead: ['Plan Name', 'Amount', 'Data'],
    widthArr: [200, 200, 200],
  };

  const updatedTableData = AllSubscribedPlan ? AllSubscribedPlan.map((item) => [
    item.subscription_plan.name,
    item.amount,
    item.member.subscription.start_date,
  ]) : [];




 // =================  for table view ============================
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
      console.log('Single Subscribed Plan Data:', res.data);
      setSingleSubscribedPlan(res.data);
      setIsLoading(false); // Data has been loaded
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Handle error and set isLoading to false
    });
};

useEffect(() => {
  // Fetch the single plan when the component mounts
  fetchSinglePlan();

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






  // // =================  for table view ============================
  // const apiUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/get-member-transactions';

  // fetch(apiUrl, {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': `Bearer ${userToken}`,
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     // Process the API response here
  //     setAllSubscribedPlan(data.data);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data:', error);
  //   });

  // // console.log('API Response:', AllSubscribedPlan);

  


  // //console.log('updated API Response:', updatedTableData);

  // //====================== for single plan ==================================

  // const singleUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/membership-details';

  // fetch(singleUrl, {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': `Bearer ${userToken}`,
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     return response.json();
  //   })
  //   .then((res) => {
  //     // Process the API response here
  //     setSingleSubscribedPlan(res.data);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data:', error);
  //   });

  // console.log('single api Response:', singleSubscribedPlan);



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
        }}>Membership Plan</Text>


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
          flexDirection: 'row',
          marginBottom: 50,
          paddingBottom: 20,
        }}>

          {/* <FlatList
  keyExtractor={(item) => item.id}
  data={singleSubscribedPlan}
  renderItem={({ item }) => ( */}

{isLoading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : (
            Array.isArray(singleSubscribedPlan) ? (
              singleSubscribedPlan.map((item, index) => (

            <View style={{
              marginTop: 30,
              marginLeft: 20,
              alignItems: 'center'
              }} key={index}>

              <Text style={{
                textAlign: 'center',
                fontFamily: 'Philosopher-Bold',
                fontSize: 25,
                fontWeight: '600',
                color: '#000',
              }}>{item.subscription_plan.name}</Text>


              <Text style={{
                fontWeight: 'bold',
                paddingTop: 5,
                marginTop: 5,
                fontSize: 15, fontFamily: 'Philosopher-Bold',
              }}>Active till: {item.end_date}</Text>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Image source={require('../images/rupee.png')}
                  style={{
                    width: 22, height: 20,
                    marginLeft: 40,
                    paddingTop: 5,
                    marginTop: 12,
                  }} />

                <Text style={{
                  fontWeight: 'bold',
                  color: 'black',
                  paddingTop: 5,
                  marginTop: 5,
                  fontSize: 30, fontFamily: 'Philosopher-Bold',
                }}>{item.subscription_plan.price}</Text>
                <Text style={{
                  fontWeight: 'bold',
                  marginRight: 40,
                  paddingTop: 5,
                  marginTop: 5,
                  fontSize: 15, fontFamily: 'Philosopher-Bold',
                }}>/yearly</Text>
              </View>

              <Text style={{
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: 10,
                marginBottom: 10
              }}>Subscribed Date:{item.start_date}</Text>
            </View>
          
         ))
            ) : (
              <Text style={styles.errorText}>Failed to load data.</Text>
            )
          )}

            {/* )}/>  */}


          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {

              }}>
              <Text style={{
                marginLeft: 70,
                padding: 10,
                backgroundColor: '#c27b7f',
                fontWeight: 'bold',
                fontSize: 15,
                color: "#fff",
                borderRadius: 8,
              }}>Upgrade Plan</Text>
            </TouchableOpacity>
          </View>

        </View>

        <Text style={{
          fontFamily: 'Philosopher-Bold',
          fontSize: 27,
          fontWeight: '600',
          color: '#000',
          textAlign: 'center',
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

          {/* =================search============= */}
          <View style={{
            padding: 5,
            width: '70%',
            height: 50,
            backgroundColor: '#fff3cd',
            marginTop: 20,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: 'gray',
              paddingHorizontal: 12,
              marginLeft: 20,

            }}>

              <Feather name="search" color={"gray"} size={20} style={{ marginRight: 8, }} />
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 16,
                }}
                placeholder="Search a Book"
                spellCheck={false}
                //value={searchQuery}
                onChangeText={(Text) => {
                  // setSearchQuery(Text);
                  // handleSearch();

                }}
              />

              {/* {searchQuery !== '' && ( */}
              <TouchableOpacity onPress={() => {
                // setSearchQuery('');
                // setSearchResults('');

              }}>
                <Feather name="x" color={"gray"} size={20} style={{ marginRight: 8, }} />
              </TouchableOpacity>
              {/* )} */}

            </View>
          </View>
          {/* Display search results */}

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

export default MembershipScreen;
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
}); 