// import { View, Text } from 'react-native'
// import React from 'react'

// const About = () => {
//   return (
//     <View>
//       <Text>About</Text>
//     </View>
//   )
// }

// export default About

import React from "react";
import Header from '../common/Header';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView
} from "react-native";
//import Video from 'react-native-video';

//const viewStyle = {height: 250};

const ELibrary = ({navigation}) => {
  return (
    
                  
    <View style={styles.container}>
      <Header
                        rightIcon={require('../images/Logoelibrary.png')}
                        leftIcon={require('../images/back.png')}
                        onClickLeftIcon={() => {
                              navigation.navigate('Home');
                        }}
                  />
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>ABOUT E-LIBRARY</Text>
          <Text style={styles.subtitle}>Learn about the E-library</Text>
          <View style={styles.divider}></View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS78tgWOb0zIYrNSYtIRGPYWjI0o_14VyvwqXMhcT6NkAlXLOXPEXl7A8vGzCrR2Y-df8g&usqp=CAU"
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
        {/* <View style={viewStyle}>
          <Video
            source={{
              uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            }}
            style={videoStyle}
            controls={true}
            resizeMode="cover"
            hideShutterView={true}
            paused={true}
          />
          </View> */}

        {/* <TouchableOpacity
            style={styles.videoButton}
            onPress={() => {
              // Add code to handle video modal here
            }}
          > */}
        {/* Insert your video button icon here */}
        {/* </TouchableOpacity> */}

        {/* <View style={styles.promoVideo}>
            {/* Insert your promo video waves here */}
        {/* </View> */}

        {/* </View> */}

        <View style={styles.textContainer}>
          <Text style={{ marginTop: 30 }}>
            Welcome to our e-library web portal! We are a team of passionate
            individuals dedicated to providing you with the best possible online
            and physical library experience. Our goal is to make it easy and
            convenient for you to access an extensive collection of digital
            books, magazines, journals, and other educational resources from the
            comfort of your own home or in person at our physical location.
          </Text>
          <Text style={{ marginTop: 30 }}>
            Our team is made up of experienced librarians, technologists of
            Educron, and content experts who have a deep understanding of the
            importance of education and learning. We believe that knowledge is
            the key to personal and professional growth, and we want to help you
            unlock your full potential through our platform and physical
            library.
          </Text>
          <Text style={{ marginTop: 30 }}>
            We strive to ensure that our e-library is user-friendly, with an
            intuitive interface that allows you to easily search for and find
            the materials you need. Whether you're a student, a researcher, or
            simply someone who loves to read, we have something for you.
          </Text>

          <View style={styles.socialIcons}>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.facebook.com")}
            >
              <Text>facebook</Text>
              {/* <Image
              source={require('./images/facebook.svg')}
              style={styles.socialIcon}
            /> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.twitter.com")}
            >
              <Text>twitter</Text>
              {/* <Image
              source={require('./images/twitter.svg')}
              style={styles.socialIcon}
            /> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.linkedin.com")}
            >
              <Text>linkedin</Text>
              {/* <Image
              source={require('./images/linkedin.svg')}
              style={styles.socialIcon}
            /> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.youtube.com")}
            >
              <Text>youtube</Text>
              {/* <Image
              source={require('./images/youtube-play.svg')}
              style={styles.socialIcon}
            /> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.whatsapp.com")}
            >
              <Text>whatsapp</Text>
              {/* <Image
              source={require('./images/whatsapp.svg')}
              style={styles.socialIcon}
            /> */}
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPi36Mbu9btsVIVqPF8-DIeKsOtnd2yJljDQ&usqp=CAU"
                }}
                style={styles.authorImage}
                resizeMode="cover"
              />
            </View>
          </View>
          <Text style={{ marginTop: 30 }}>
            In addition to our extensive digital collection, we offer access to
            our physical library. Our physical library is located in Nagpur and
            is open during regular business hours. As a member, you can browse
            our shelves or simply search here in this portal, reserve or book
            the books and find their location on the Racks, as well.
          </Text>
          <Text style={{ marginTop: 30 }}>
            To become a member of our physical library, sign up for a membership
            on our website or visit our physical location to fill out an
            application. Once you're a member, you'll have access to all of our
            physical materials, as well as our online collection.
          </Text>
          <Text style={{ marginTop: 30 }}>
            We are constantly updating both our digital and physical collections
            with the latest and most relevant materials, so you can be sure that
            you're always accessing the most up-to-date information. We also
            offer a range of services to help you get the most out of our
            platform, including personalized recommendations and curated reading
            lists.
          </Text>
          <Text style={{ marginTop: 30 }}>
            At our e-library, we are committed to providing you with the highest
            quality resources and services. We value your feedback and are
            always looking for ways to improve our platform and physical
            library, so please don't hesitate to get in touch with us if you
            have any suggestions or comments.
          </Text>
          <Text>
            Thank you for choosing our e-library web portal, and we hope you
            enjoy your learning journey with us, whether online or in person.
          </Text>
        </View>

        {/* <View style={styles.container}>
      <View style={styles.socialIconsContainer}>
        {socialIcons.map((icon, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleIconClick(icon.url)}
            style={styles.iconContainer}
          >
            <Image
              source={icon.iconPath}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View> */}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
 
  },
  socialIcons: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleContainer: {
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#c27b7f"
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20
  },
  divider: {
    width: 20,
    height: 3,
    backgroundColor: "black",
    marginVertical: 10
  },
  contentContainer: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 25
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  authorImage: {
    width: "100%",
    height: 200,
    borderRadius: 10
  },
  videoButton: {
    // your video button styles here
  },
  promoVideo: {
    // your promo video waves styles here
  },
  textContainer: {
    flex: 1,
    marginLeft: 20
  }
};

export default ELibrary;
