import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList,ActivityIndicator } from 'react-native';
import Header from '../common/Header';
import { Table, Row } from 'react-native-table-component';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';

const MembershipScreen = ({ navigation }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [AllSubscribedPlan, setAllSubscribedPlan] = useState(null);
  const [singleSubscribedPlan, setSingleSubscribedPlan] = useState(null);
  const { userToken } = useContext(AuthContext);
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
        // console.log('Single Subscribed Plan Data:', res.data);
        setSingleSubscribedPlan(res.data);
        setIsLoading(false); // Data has been loaded
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Handle error and set isLoading to false
  
      });
  };

  // console.log(singleSubscribedPlan);
  
  useEffect(() => {  
    fetchSinglePlan();
  },[]);


  useEffect(() => {
    if (userToken!==null && singleSubscribedPlan) {
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
  }, [userToken,singleSubscribedPlan]);

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


  const formattedDate = singleSubscribedPlan ?formatDate(singleSubscribedPlan.start_date):null;
  const formattedDate1 = singleSubscribedPlan ?formatDate(singleSubscribedPlan.end_date):null;
  
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
     
        <Text style={styles.sectionHeading}>Membership Plan</Text>
        <View style={[styles.dividerView,{ width: 170, marginLeft: 100,}]}></View>

        
{singleSubscribedPlan ?
        (isLoading  ? (<ActivityIndicator style={{justifyContent:'center',alignItems:'center'}} size="large" color="#c27b7f" />): 
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
                textAlign: 'center',
                fontFamily: 'Philosopher-Bold',
                fontSize: 25,
                fontWeight: '600',
                color: '#000', 
              }}>Annual plan</Text>) : (singleSubscribedPlan.plan_id === 8? (<Text style={{
                textAlign: 'center',
                fontFamily: 'Philosopher-Bold',
                fontSize: 25,
                fontWeight: '600',
                color: '#000', 
                right: 35
              }}>Long Term</Text>) : (<Text style={styles.loadingText}>Loading...</Text>))}

              <Text style={{
                paddingTop: 5,
                marginTop: 5,
                fontSize: 15,
                fontFamily: 'Philosopher-Bold',
                color:'#2f4858'
              }}>Active till:  {formattedDate1}  </Text>

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
                    marginLeft: 40,
                    paddingTop: 5,
                    marginTop: 12, 
                    right: -35
                  }} />

                <Text style={{
                  color: 'black',
                  paddingTop: 5,
                  marginTop: 5,
                  fontSize: 30,
                   fontFamily: 'Philosopher-Bold',
                    right: -35
                }}>{singleSubscribedPlan.plan_amount}</Text>
                <Text style={{
                  marginRight: 40,
                  paddingTop: 5,
                  marginTop: 5,
                  fontSize: 15,
                   fontFamily: 'Philosopher-Bold', 
                   right: -35,
                   color:'#2f4858'
                }}>/yearly</Text>
              </View>

              <Text style={{
                textAlign: 'center',
                fontFamily: 'Philosopher-Bold', 
                marginTop: 10,
                marginBottom: 10,
                 right: -10,
                 color:'#2f4858'
              }}>Subscribed Date:{formattedDate}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' ,}}>
              <TouchableOpacity
                onPress={() => {navigation.navigate('MembershipPlan')


                }}>
                <Text style={
                  {
                  marginLeft: 20,
                  padding: 10,
                  backgroundColor: '#c27b7f',
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: "#fff",
                  borderRadius: 8,
                }
                }>Upgrade Plan</Text>
              </TouchableOpacity>
            </View>

          </View>
        <Text style={styles.sectionHeading}>Transaction</Text>
        <View style={[styles.dividerView,{ width: 110, marginLeft: 130,}]}></View>
        <View style={{
          backgroundColor: '#fff3cd',
          marginTop: 20,
          flexDirection: 'column',
          marginBottom: 50,
          paddingBottom: 20,
        }}>

          {/* =================search============= */}
 <View style={styles.searchcontainer}>
<View style={styles.searchBar}>
<Feather name="search" color={"gray"} size={20} style={styles.searchIcon} />
<TextInput
  style={styles.searchInput}
  placeholderTextColor="blue"
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
          {/* Display search results */}

          {/* table */}
          <View style={{ flex: 1, backgroundColor: '#fff3cd', marginTop: 15 }}>
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
                        style={[styles.row1, index % 2 && { backgroundColor: '#fff', }]}
                        textStyle={styles.texttt}
                      />
                    ))}
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>


        </View>
  </View>
        )):(<Text> No Membership</Text>)}
     
      </ScrollView>

    </View>
  );
}}
</Theme>
  );
};

export default MembershipScreen;