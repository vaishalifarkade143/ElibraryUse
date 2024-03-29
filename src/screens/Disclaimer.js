
import React from 'react';
import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import Header from '../common/Header';
import RNFetchBlob from 'rn-fetch-blob';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';

const Disclaimer = ({ navigation }) => {

  //=======================================for permition=================================================
  const xlsxUrl = 'https://elibrary.veerit.com/public/uploads/desclaimer/Disclaimer.docx';
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile();
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  const downloadFile = () => {
    const { config, fs } = RNFetchBlob;
    const data = new Date();
    const fileDir = fs.dirs.DownloadDir;//download file Directory where want to store

    //=========================================file download code ===========================

    config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      //================================filedownload manager code============================
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: fileDir + "/download_" + Math.floor(data.getDate() + data.getSeconds() / 2) + '.xlsx',//mix of date n time to get random no.
        description: 'file download'
      }
      //=======================================
    })
      .fetch('GET', xlsxUrl, {
        //some headers ..
      })
      .then((res) => {
        // the temp file path
        console.log('The file saved to ', res.path());
        alert("file downloaded successfully")
      })
  }


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
            {/* <View style={{ padding: 20, paddingBottom: 100 }}> */}
              <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.terms} >
                  <Text style={styles.heading}>Disclaimer</Text>
                  <Text style={styles.disclemerText}>The e-books
                    are available on the E-Library portal of Smart City Library.
                    They are provided under the concept of fair dealing for the Educational purposes of the
                    Library members.</Text>

                  <Text style={styles.disclemerText}>The contractor of the E-Library has made reasonable efforts to obtain permission for copyrighted books and digitize
                    the physical books listed as e-books in the portal. However, it is essential to note that the contractor does not claim ownership
                    of the copyright to these books.</Text>

                  <Text style={styles.disclemerText}>The contractor acknowledges that the copyright to the books remains with the respective authors, publishers, and copyright holders.
                    The purpose of providing e-book formats on the E-Library portal is to facilitate access to educational resources for students and
                    visitors of the Library.</Text>


                  <Text style={styles.disclemerText}>Users of the E-Library portal are solely responsible for using the e-books. They must adhere to the provisions of the Indian
                    Copyright Law and any other applicable laws and regulations. The contractor does not assume any responsibility or liability for any
                    misuse or copyright infringement resulting from using the e-books.</Text>

                  <Text style={styles.disclemerText}>It is advised that users of the E-Library portal respect the rights of the copyright holders and utilize the e-books for personal,
                    educational, and non-commercial purposes only. Any unauthorized reproduction, distribution, or modification of the e-books may
                    infringe upon the rights of the copyright holders and is strictly prohibited.</Text>


                  <Text style={styles.disclemerText}>The contractor of the E-Library portal disclaims any liability for any legal consequences or claims arising from the use or
                    misuse of the e-books available on the portal. Users should exercise their own judgment, take necessary precautions when using the
                    e-books, and seek appropriate permissions or licenses from the copyright holders if required.</Text>


                  <Text style={styles.subHeading}>Reporting Abuse:</Text>

                  <Text style={styles.disclemerText}>Smart City Library is committed to upholding copyright laws and respecting the rights of copyright holders.
                    Suppose you believe that any of the e-books available on the portal infringe upon your copyright or the copyright of someone you
                    represent. In that case, we encourage you to report such instances of abuse promptly.</Text>

                  <Text style={styles.disclemerText}>To report abuse regarding copyrighted books on the E-Library portal, don't hesitate to contact us at admin@smartcitylibrary.com.
                    We will thoroughly investigate all reports of abuse and take appropriate actions in accordance with the law.</Text>


                  <Text style={styles.disclemerText}>By accessing and using the E-Library portal, users agree to abide by this disclaimer, the Terms of Usage outlined by Smart City
                    Library, and the responsibility to report any instances of abuse or copyright infringement.</Text>

                  <Text style={styles.disclemerText}>Please note that the contractor
                    reserves the right to remove any e-books from the portal if there is a reasonable belief of copyright infringement or violation
                    of the Terms of Usage.</Text>
                </View>


                <TouchableOpacity
                   style={[styles.loginbtn, { backgroundColor: '#c27b7f',marginTop:10,marginBottom:10 }]}
                  onPress={requestStoragePermission}

                >
                  <Text style={{
                    color: '#fff',fontFamily: 'OpenSans-Regular',
                    fontSize: 13
                  }}>Download</Text>
                </TouchableOpacity>

              </ScrollView>
            </View>
          // </View>
        );
      }}
    </Theme>
  );
};

export default Disclaimer;