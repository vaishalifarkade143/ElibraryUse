
import React, { useState } from 'react';
import { View, Text, Image, TextInput, Linking, ScrollView, TouchableOpacity } from 'react-native';
import Header from "../common/Header";

const ContactForm = ({ navigation }) => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [subject, setsubject] = useState('');
  const [message, setmessage] = useState('');


  const handleSubmit = () => {
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
            style={{
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              flexDirection: "row",
              margin: 15,
              paddingLeft: 15,
              gap: 10
            }}>
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
            style={{
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              flexDirection: "row",
              margin: 15,
              paddingLeft: 15,
              gap: 10
            }}>
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
            style={{
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              flexDirection: "row",
              margin: 15,
              paddingLeft: 15,
              gap: 10
            }}>
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
            style={{
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              flexDirection: "row",
              margin: 15,
              paddingLeft: 15,
              gap: 10
            }}>
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
            <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com')}>
              <Image
                source={require('../images/facebookk.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.twitter.com')}>
              <Image
                source={require('../images/twitterr.png')}
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

}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f5ebe6',
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10
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
  loginbtn: {
    alignItems: 'center',
    borderRadius: 5,
    width: '40%',
    height: 60,
    justifyContent: 'center',
    marginLeft: 90
  },

  contactInfo: {
    marginBottom: 20,
    padding: 10,

  },
  infodetails: {
    fontSize: 15,
    color: '#2f4858',
    fontWeight: '500'
  },
  info: {
    fontSize: 20,
    marginTop: 5,
    color: '#000',
    fontFamily: 'Philosopher-Bold',
  },

  socialText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialIcon: {
    width: 25,
    height: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  socialIconsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleContainer: {
    alignItems: "center"
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '500',
    color: "#c27b7f",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 5,
    color: '#2f4858',
    fontFamily: 'Philosopher-Bold',
  },
  divider: {
    width: 20,
    height: 3,
    backgroundColor: "black",
    marginVertical: 10
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 25,
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 35,
    height: 35,
    marginBottom: 30,
    marginRight: 15,
  },
};

export default ContactForm;

