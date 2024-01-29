
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../common/Header';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';

const PrivacyPolicy = ({ navigation }) => {
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
                                    <View style={styles.terms}>
                                          <ScrollView>
                                                <Text style={styles.heading}>Privacy Policy</Text>
                                                <Text style={styles.subHeading}>Privacy Policy</Text>
                                                <Text style={styles.disclemerText}>We take your privacy seriously at our library, and we are
                                                      committed to protecting your personal information.
                                                      This privacy policy describes how we collect, use, and
                                                      share your personal information when you use our online
                                                      platform and borrow physical books from our physical library.</Text>


                                                <Text style={styles.subHeading}>Information We Collect</Text>
                                                <Text style={styles.disclemerText}>We collect personal information from
                                                 you when you create an
                                                 account on our online platform or register as a member of our physical library.
                                                  This information may include your name, email address, physical address, and phone number.
                                                  We also collect information about your use of our online platforms, such as your browsing history,
                                                   search queries, and the books you have checked out or placed on hold. We may use cookies and
                                                    other tracking technologies to collect this information.</Text>


                                                <Text style={styles.subHeading}>How We Use Your Information</Text>
                                                <Text style={styles.disclemerText}>We use your personal information to 
                                                provide you with access to our online platform and physical library services, to communicate with
                                                 you about your account and book loans, and to improve our services. We may also use your personal
                                                  information for marketing purposes, such as sending you promotional emails or newsletters about 
                                                  new books and events.</Text>


                                                <Text style={styles.subHeading}>Security of Your Information</Text>
                                                <Text style={styles.disclemerText}>We take reasonable measures to protect
                                                 your personal information from unauthorized access, disclosure, or misuse. However, no security measures
                                                  are foolproof, and we cannot guarantee the security of your personal information.</Text>


                                                <Text style={styles.subHeading}>Your Rights and Choices</Text>
                                                <Text style={styles.disclemerText}> You have the right to access and update
                                                 your personal information and to opt out of receiving marketing communications from us. You may do so by 
                                                 logging into your account on our online platform or contacting us at the email address provided below.</Text>



                                                <Text style={styles.subHeading}>Changes to this Privacy Policy</Text>
                                                <Text style={styles.disclemerText}>We reserve the right to modify 
                                                this privacy policy at any time without prior notice. Any changes to this privacy policy will be
                                                 posted on our website and will become effective immediately upon posting.</Text>



                                                <Text style={styles.subHeading}>Contact Us</Text>
                                                <Text style={styles.disclemerText}>If you have any questions or concerns
                                                 about this privacy policy, please contact us at info@digitallibrary.com</Text>
                                          </ScrollView>
                                    </View>
                              </View>
                        );
                  }}
            </Theme>
      );
};

export default PrivacyPolicy;