
import React, { useState } from 'react';
import { View, Text, Image, TextInput, Linking, ScrollView, TouchableOpacity } from 'react-native';
import Header from "../common/Header";
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';

const ContactForm = ({ navigation }) => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [subject, setsubject] = useState('');
  const [message, setmessage] = useState('');


  const handleSubmit = () => {
  };
  return (
    <Theme>
      {({ theme }) => {
        const styles = getStyles(theme);
        return (
          <View style={styles.container}>
            <Header
              rightIcon={require('../images/Logoelibrary.png')}
              leftIcon={require('../images/back.png')}
              onClickLeftIcon={() => {

                navigation.goBack();
              }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>CONTACT US</Text>
                <Text style={styles.subtitle}>We'd love to hear from you</Text>
                <View style={{
                  width: 150,
                  height: 2,
                  backgroundColor: '#c27b7f',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -15,
                }}></View>
              </View>

              <View style={styles.formContainer}>

                <View
                  style={styles.contactTxtInput}>
                  <Image source={require('../images/user.png')}
                    style={{ width: 15, height: 15, }} />
                  <TextInput
                    placeholder="Your Name"
                    autoCompleteType="name"
                    keyboardType="name-phone-pad"
                    value={name}
                    onChangeText={setname}
                  />
                </View>
                <View
                  style={styles.contactTxtInput}>
                  <Image source={require('../images/email.png')}
                    style={{ width: 15, height: 15, }} />
                  <TextInput
                    placeholder="Email"
                    autoCompleteType="email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setemail}
                  />
                </View>
                <View
                  style={styles.contactTxtInput}>
                  <Image source={require('../images/goal.png')}
                    style={{ width: 15, height: 15, }} />
                  <TextInput
                    placeholder="Subject"
                    autoCompleteType="subject"
                    keyboardType="name-phone-pad"
                    value={subject}
                    onChangeText={setsubject}
                  />
                </View>
                <View
                  style={styles.contactTxtInput}>
                  <Image source={require('../images/send.png')}
                    style={{ width: 15, height: 15, }} />
                  <TextInput
                    placeholder="Your Message"
                    autoCompleteType="message"
                    keyboardType="name-phone-pad"
                    value={message}
                    onChangeText={setmessage}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.loginbtn, { backgroundColor: '#c27b7f', }]}
                  //: '#e4e7ea'
                  onPress={handleSubmit}
                  disabled={!name || !email}
                >
                  <Text style={{
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: 18
                  }}>Send Now</Text>
                </TouchableOpacity>

              </View>

              <View style={styles.contactInfo}>
                <Text style={styles.info}>ADDRESS:  </Text>
                <Text style={styles.infodetails}> Great Nag Rd, Indira Nagar, Rambagh, Nagpur,</Text>
                <Text style={styles.infodetails}> Maharashtra 440003</Text>
                <Text style={styles.info}>PHONE: </Text>
                <Text style={styles.infodetails} onPress={() => Linking.openURL('tel:+918981055565')}>(+91) 898 105 5565</Text>
                <Text style={styles.info}>EMAIL: </Text>
                <Text style={styles.infodetails} onPress={() => Linking.openURL('/')}>info@digitallibrary.com</Text>
              </View>

              <View style={styles.titleContainer}>
                <Text style={styles.subtitle}>Reach out to us on social media</Text>
                <View style={styles.socialIcons}>
                 
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.twitter.com')}>
                    <Image
                      source={require('../images/twitterr.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com')}>
                    <Image
                      source={require('../images/facebookk.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com')}>
                    <Image
                      source={require('../images/linkedin.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com')}>
                    <Image
                      source={require('../images/youtube.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.whatsapp.com')}>
                    <Image
                      source={require('../images/whatsapp.png')}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        );
      }}
    </Theme>

  );

}

export default ContactForm;

