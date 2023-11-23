
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Header from '../common/Header';
import { Table, Row } from 'react-native-table-component';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';


const MembershipScreen = ({ navigation }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [AllSubscribedPlan, setAllSubscribedPlan] = useState(null);
  const [singleSubscribedPlan, setSingleSubscribedPlan] = useState([]);
  const { userToken,userInfo } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');


  const state = {
    tableHead: ['Plan Name', 'Amount', 'Data'],
    widthArr: [200, 200, 200],
  };

  // =================  for single data view ============================
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

  // =================  for table view ============================
  
  
 
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
  }, []);





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


  const formattedDate = formatDate(singleSubscribedPlan.start_date);
  const formattedDate1 = formatDate(singleSubscribedPlan.end_date);






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
          marginLeft: 110,
        }}></View>




        

        {isLoading ? (<ActivityIndicator style={{
          justifyContent: 'center',
          alignItems: 'center'
        }} size="large" color="#c27b7f" />) :


          
          
          (<View>
            <View style={{
              backgroundColor: '#fff3cd',
              marginTop: 20,
              flexDirection: 'row',
              marginBottom: 50,
              paddingBottom: 20,
            }}>

              <View style={{
                marginTop: 30,
                marginLeft: 10,
                alignItems: 'center'
              }} >
                {singleSubscribedPlan.plan_id === 1 ? (<Text style={{
                  fontFamily: 'Philosopher-Bold',
                  fontSize: 25,
                  fontWeight: '600',
                  color: '#000',
                }}>Annual plan</Text>) : (singleSubscribedPlan.plan_id === 8 ? (<Text style={{
                  textAlign: 'center',
                  fontFamily: 'Philosopher-Bold',
                  fontSize: 25,
                  fontWeight: '600',
                  color: '#000',
                  right: 35
                }}>Long Term</Text>) : (<Text style={styles.loadingText}>Loading...</Text>))}

                <Text style={{
                  fontWeight: 'bold',
                  paddingTop: 5,
                  marginTop: 5,
                  fontSize: 15, fontFamily: 'Philosopher-Bold',
                }}>Active till : {formattedDate1}  </Text>

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  right: 64
                }}>
                  <Image source={require('../images/rupee.png')}
                    style={{
                      width: 22,
                      height: 20,
                      marginLeft: 30,
                      paddingTop: 5,
                      marginTop: 12,
                      right: -35
                    }} />

                  <Text style={{
                    fontWeight: 'bold',
                    color: 'black',
                    paddingTop: 5,
                    marginTop: 5,
                    fontSize: 30, fontFamily: 'Philosopher-Bold', right: -35
                  }}>{singleSubscribedPlan.plan_amount}</Text>
                  <Text style={{
                    fontWeight: 'bold',
                    marginRight: 40,
                    paddingTop: 5,
                    marginTop: 5,
                    fontSize: 15, fontFamily: 'Philosopher-Bold', right: -40
                  }}>/yearly</Text>
                </View>

                <Text style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginBottom: 10,
                  fontWeight: 'bold', right: -10
                }}>Subscribed Date:{formattedDate}</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MembershipPlan')


                  }}>
                  <Text style={{
                    marginLeft: 20,
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

              {/* ==================search======================= */}
              <View style={styles.searchcontainer}>
                <View style={styles.searchBar}>
                  <Feather name="search" color={"gray"} size={20} style={styles.searchIcon} />
                  <TextInput
                    style={styles.searchInput}
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
          </View>)
          
          
          
          
          
          
          
          
          
          }
      
      
      
      
      
      
      
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
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center'
  },
  searchIcon: {
    marginRight: 20,
  },
  searchInput: {
    fontSize: 15,
  },
  searchcontainer: {
    marginTop: 10,
    marginLeft: 10,
    padding: 5,
    width: '75%',
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