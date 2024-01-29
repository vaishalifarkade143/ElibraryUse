

import React, { useEffect, useState } from "react";
import Header from '../common/Header';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView
} from "react-native";
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';

const ELibrary = ({ navigation }) => {
  const [totalBooksCount, setTotalBooksCount] = useState(0);
  useEffect(() => {
    const getbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
        .then(res => res.json())
        .then(responce => {
          setTotalBooksCount(responce.data.length); // Set the total count
        });
    };
    getbooks();
  }, []);

  return (
    <Theme>
      {({ theme }) => {
        const styles = getStyles(theme);
        return (
          <View style={styles.container}>
            <Header
              // rightIcon={require('../images/Logoelibrary.png')}
              leftIcon={require('../images/back.png')}
              onClickLeftIcon={() => {
                navigation.navigate('Home');
              }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>ABOUTE  LIBRARY</Text>
                <Text style={styles.subtitle}>Where Information Comes Alive</Text>
                {/* <View style={{
                  width: 150,
                  height: 2,
                  backgroundColor: '#c27b7f',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -15,
                }}></View> */}
              </View>


              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri:
                      "https://dindayalupadhyay.smartcitylibrary.com/images/achive.png"
                  }}
                  style={styles.image1}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={[styles.disclemerText,{marginLeft:10,marginRight:10}]}>
                  Smart City Digital Library is the online repository of knowledge,
                  where it is easy to discover the knowledge from available recourse with search/browse facilities.
                  It is an innovative project mentored by Nagpur Smart and Sustainable City Development Corporation
                  Limited under the Smart City Mission of Ministry of Housing and Urban Affairs (MoHUA),
                  Government of India. The objective of this ambitious solution is to ease the access of the readers
                  to the right resources on the go with minimum efforts.
                </Text>
                <Text style={[styles.disclemerText,{marginLeft:10,marginRight:10}]}>
                  Smart City's Digital Library provides Study resources that benefit all age group users,
                  School and College students, aspirants preparing for competitive exams, Researchers and general
                  learners. This Digital Library is designed to hold content of English, Hindi, Marathi languages. Under this project traditional Libraries of Nagpur Municipal Corporation are being converted to Digital libraries with the facilities to have access to the resources worldwide. The library is equipped with
                  smart devices which facilitates differently-able learners to gain the knowledge of their choice
                </Text>


                <View style={styles.socialIconsContainer}>
                 
                  <TouchableOpacity
                    onPress={() => Linking.openURL("https://www.twitter.com")}
                  >
                    <Image
                      source={require('../images/twitterr.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Linking.openURL("https://www.facebook.com")}
                  >
                    <Image
                      source={require('../images/facebookk.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Linking.openURL("https://www.linkedin.com")}
                  >
                    <Image
                      source={require('../images/linkedin.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Linking.openURL("https://www.youtube.com")}
                  >
                    <Image
                      source={require('../images/youtube.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Linking.openURL("https://www.whatsapp.com")}
                  >
                    <Image
                      source={require('../images/whatsapp.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                </View>

              </View>

              <View style={styles.titleContainer}>
                <Text style={styles.title}>AWESOME STATUS</Text>
                <Text style={styles.subtitle}>ALL MILESTONES ACHIEVED</Text>
                {/* <View style={{
                  width: 150,
                  height: 2,
                  backgroundColor: '#c27b7f',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -15,
                }}></View> */}
              </View>

              <View style={{
                flexDirection: 'row', justifyContent: 'center',
                alignItems: 'center', marginTop: 25, marginBottom: 30,
              }}>

                <View style={{
                  borderRightColor: '#2826268a', borderRightWidth: 1
                }}>
                  <Text style={styles.reviewcount}>{totalBooksCount}</Text>
                  <Text style={styles.review}>Books</Text>
                </View >
                <View style={{
                  borderRightColor: '#2826268a', borderRightWidth: 1
                }}>
                  <Text style={styles.reviewcount}>12500+</Text>
                  <Text style={styles.review}>Total Views</Text>
                </View>
                <View>
                  <Text style={styles.reviewcount}>3</Text>
                  <Text style={styles.review}>Award</Text>
                </View>

              </View>


            </ScrollView>
          </View>
        );
      }}
    </Theme>

  );
};


export default ELibrary;
