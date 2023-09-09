// import { View, Text } from 'react-native'
// import React from 'react'

// const Contact = () => {
//   return (
//     <View>
//       <Text>Contact</Text>
//     </View>
//   )
// }

// export default Contact

import React, { useState } from 'react';
import { View, Text, TextInput,Linking, ScrollView,TouchableOpacity } from 'react-native';
import Header from "../common/Header";


const ContactForm=({navigation})=>{
const [name, setname] = useState('');
const [email, setemail] = useState('');
const [subject, setsubject] = useState('');
const [message, setmessage] = useState('');

  
const handleSubmit = () => {
    // Implement your form submission logic here
  };
    return (
      <View style={styles.container}>
        <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {

          navigation.goBack();
        }}
      />
        <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTACT US</Text>
          <Text style={styles.sectionSubtitle}>We'd love to hear from you</Text>
          <View style={styles.sectionDivider}></View>
        </View>

        <View style={styles.formContainer}>
          <TextInput
             style={styles.input}
            placeholder="Your Name"
              autoCompleteType="name"
              
              value={name}
              onChangeText={setname}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Email"
              autoCompleteType="email"
              keyboardType="email-address"
              value={email}
              onChangeText={setemail}
          />
          <TextInput
            style={styles.input}
            placeholder="Subject"
              autoCompleteType="subject"
              
              value={subject}
              onChangeText={setsubject}
          />
          <TextInput
            style={styles.messageInput}
            placeholder="Your Message"
            autoCompleteType="message"
              
              value={message}
              onChangeText={setmessage}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={!name || !email}
          >
            <Text style={styles.buttonText}>Send Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.address}>
            ADDRESS:  {'\n'}Great Nag Rd, Indira Nagar, Rambagh, Nagpur, Maharashtra 440003
          </Text>
          <Text style={styles.phone}>
            PHONE:  {'\n'}<Text onPress={() => Linking.openURL('tel:+918981055565')}>(+91) 898 105 5565</Text>
          </Text>
          <Text style={styles.email}>EMAIL: {'\n'} <Text onPress={() => Linking.openURL('/')}>info@digitallibrary.com</Text></Text>
        </View>
<View style={{paddingTop:2,paddingLeft:20,paddingBottom:20}}>
        <Text style={styles.socialText}>Reach out to us on social media</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com')}>
            <Text>facebook</Text>
            {/* <Image
              source={require('./images/facebook.svg')}
              style={styles.socialIcon}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.twitter.com')}>
          <Text>twitter</Text>
            {/* <Image
              source={require('./images/twitter.svg')}
              style={styles.socialIcon}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com')}>
          <Text>linkedin</Text>
            {/* <Image
              source={require('./images/linkedin.svg')}
              style={styles.socialIcon}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com')}>
          <Text>youtube</Text>
            {/* <Image
              source={require('./images/youtube-play.svg')}
              style={styles.socialIcon}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.whatsapp.com')}>
          <Text>whatsapp</Text>
            {/* <Image
              source={require('./images/whatsapp.svg')}
              style={styles.socialIcon}
            /> */}
          </TouchableOpacity>
        </View>
        </View>
        </ScrollView>
      </View>
    );
  
}

const styles = {
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#c27b7f'
  },
  sectionSubtitle: {
    fontSize: 18,
    
  },
  sectionDivider: {
    width: 30,
    height: 3,
    backgroundColor: 'blue',
    marginTop: 10,
  },
  formContainer: {
    // backgroundColor: "#c27b7f69",
    marginBottom: 20,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 15,
    paddingVertical: 5,
  },
  messageInput: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 15,
    paddingVertical: 5,
    height: 100,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    
  },
  contactInfo: {
    marginBottom: 20,
    padding: 20,
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  phone: {
    marginTop:20,
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  email: {
    marginTop:20,
    fontSize: 16,
    fontWeight: 'bold'
  },
  socialText: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom:10,
    //padding: 20,
  },
  socialIcons: {
   // padding:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialIcon: {
    width: 25,
    height: 25,
  },
};

export default ContactForm;

