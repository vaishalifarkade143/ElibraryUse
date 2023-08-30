// import { View, Text } from 'react-native'
// import React from 'react'

// const Disclaimer = () => {
//   return (
//     <View>
//       <Text>Disclaimer</Text>
//     </View>
//   )
// }

// export default Disclaimer


import React from 'react';
import { View, Text, TouchableOpacity, Linking,ScrollView } from 'react-native';
import styles from '../Style/styles'
import Header from '../common/Header';

const Disclaimer = ({ navigation }) => {
  const handleDownload = () => {
    Linking.openURL('https://elibrary.veerit.com/public/uploads/desclaimer/Disclaimer.docx');
  };

  return (
    <View style={styles.container}>
      <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.navigate('Home');
        }}
      />
      <View style={{ padding: 20 }}>
    <ScrollView>
      
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold' ,fontFamily:"poppins",textAlign:'center',color:'#000'}}>Disclaimer</Text>
        <Text style={{ fontSize:16,marginTop: 40 }}>The e-books are available on the E-Library portal of Smart City Library. 
        They are provided under the concept of fair dealing for the Educational purposes of the 
        Library members.</Text>

        <Text style={{ fontSize:16,marginTop: 20 }}>The contractor of the E-Library has made reasonable efforts to obtain permission for copyrighted books and digitize
 the physical books listed as e-books in the portal. However, it is essential to note that the contractor does not claim ownership
 of the copyright to these books.</Text>

 <Text style={{ fontSize:16,marginTop: 20 }}>The contractor acknowledges that the copyright to the books remains with the respective authors, publishers, and copyright holders.
 The purpose of providing e-book formats on the E-Library portal is to facilitate access to educational resources for students and 
visitors of the Library.</Text>


<Text style={{ fontSize:16,marginTop: 20 }}>Users of the E-Library portal are solely responsible for using the e-books. They must adhere to the provisions of the Indian 
Copyright Law and any other applicable laws and regulations. The contractor does not assume any responsibility or liability for any 
misuse or copyright infringement resulting from using the e-books.</Text>

<Text style={{ fontSize:16,marginTop: 20 }}>It is advised that users of the E-Library portal respect the rights of the copyright holders and utilize the e-books for personal, 
educational, and non-commercial purposes only. Any unauthorized reproduction, distribution, or modification of the e-books may 
infringe upon the rights of the copyright holders and is strictly prohibited.</Text>


<Text style={{ fontSize:16,marginTop: 20 }}>The contractor of the E-Library portal disclaims any liability for any legal consequences or claims arising from the use or 
misuse of the e-books available on the portal. Users should exercise their own judgment, take necessary precautions when using the
 e-books, and seek appropriate permissions or licenses from the copyright holders if required.</Text>


 <Text style={{ fontSize: 24, fontWeight: 'bold',marginTop:10,color:'#000' }}>Reporting Abuse:</Text>

 <Text style={{fontSize:16}}>Smart City Library is committed to upholding copyright laws and respecting the rights of copyright holders. 
Suppose you believe that any of the e-books available on the portal infringe upon your copyright or the copyright of someone you 
represent. In that case, we encourage you to report such instances of abuse promptly.</Text>


<Text style={{ marginTop: 20,fontSize:16, }}>To report abuse regarding copyrighted books on the E-Library portal, don't hesitate to contact us at admin@smartcitylibrary.com.
 We will thoroughly investigate all reports of abuse and take appropriate actions in accordance with the law.</Text>


 <Text style={{ marginTop: 20 ,fontSize:16,}}>By accessing and using the E-Library portal, users agree to abide by this disclaimer, the Terms of Usage outlined by Smart City
 Library, and the responsibility to report any instances of abuse or copyright infringement.</Text>

 <Text style={{ marginTop: 20,fontSize:16, }}>Please note that the contractor
 reserves the right to remove any e-books from the portal if there is a reasonable belief of copyright infringement or violation 
of the Terms of Usage.</Text>
</View>



        <TouchableOpacity onPress={handleDownload} style={{ marginTop: 20 }}>
        <View style={{ backgroundColor: '#c27b7f', padding: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Download</Text>
        </View>
      </TouchableOpacity>

    
    </ScrollView>
    </View>
    </View>
    
  
    
  );
};

export default Disclaimer;