
import { View, Text, ScrollView, TextInput, TouchableOpacity, ImageBackground, Alert, Image ,PermissionsAndroid, Platform} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';
import ImagePicker from 'react-native-image-crop-picker';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

import Modal from "react-native-modal";

const Profile = ({ navigation, route }) => {

    const [image, setImage] = useState('');
    const { userInfo, userToken } = useContext(AuthContext);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address_1, setAddress1] = useState('');
    const [address_2, setAddress2] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setIsData] = useState(false);
    const [removeImage, setRemoveImage] = useState(0);
    const Plan_exist = route.params.singleSubscribedPlan;
    const [visible, setVisible] = useState(false);
    console.log('profilepage', Plan_exist);


    //======================image========================



    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
           // console.log("image after chang:", image);
            setImage(image.path);
            setRemoveImage(0); // Reset the removeImage flag
            Alert.alert(
                'Success!',
                `Image set successfully `,
            );
        });
    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            //console.log("image after chang:", image);
            setImage(image.path);
            setRemoveImage(0); // Reset the removeImage flag
            Alert.alert(
                'Success!',
                `Image set successfully `,
            );
        });
    }


     const before_plan = () => {

        if (userToken !== null) {
            setFirstName(userInfo.data.user.first_name);
            setLastName(userInfo.data.user.last_name);
            setPhone(userInfo.data.user.phone);
            setEmail(userInfo.data.user.email);
            setImage(userInfo.data.user.image_path);

        }
    }

  

    useEffect(() => {
        // Fetch user profile data on component load

        if (userToken !== null && Plan_exist !== null) {

            fetchProfileData();
        }
        else { before_plan(); }
    }, [userToken]);
    const fetchProfileData = () => {
        const singleUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/member-details';

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
                setProfile(res.data);
                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
                setEmail(res.data.email);
                setPhone(res.data.phone);
                console.log("image iss member-details:", res.data.image_path);
                setImage(res.data.image_path);
                if (res.data.address !== null) {
                    setAddress1(res.data.address.address_1);
                    setAddress2(res.data.address.address_2);
                    setState(res.data.address.state);
                    setCity(res.data.address.city);
                    setZip(res.data.address.zip);
                }

                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    };

    const handleSave = async () => {
        const urlUpdate = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/update-member-profile';

        const formData = new FormData();
        formData.append('is_active', '1');
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address_1', address_1);
        formData.append('address_2', address_2);
        formData.append('country_id:', '');
        formData.append('city', city);
        formData.append('state', state);
        formData.append('zip', zip);

        if (removeImage === 1) {
            // Set the remove_image field to 1 when you want to remove the image
            formData.append('remove_image', '1');
        } else if (image) {
            // If there's an image, add it to the form data
            const imageFileName = image.split('/').pop();
            const imageData = {
                uri: image,
                type: 'image/jpeg', // Change the type if necessary
                name: imageFileName,
            };
            formData.append('image', imageData);
            setImage(imageData);
        }

        try {
            const response = await fetch(urlUpdate, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for sending files
                    Authorization: `Bearer ${userToken}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Data updated successfully:', response.json());

            fetchProfileData();
            navigation.goBack();
            setIsData(false);
            Alert.alert(
                'Success!',
                `Data Updtated successfully `,
            );
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };



    return (
        <Theme>
            {({ theme }) => {
                const styles = getStyles(theme);
                return (
                    <View style={styles.container}>
                        {/* <Header
                            rightIcon={require('../images/Logoelibrary.png')}
                            leftIcon={require('../images/menu.png')}
                            onClickLeftIcon={() => {
                                navigation.openDrawer();
                            }}
                        /> */}


                        <ScrollView>

                            <Text style={styles.sectionHeading}>Profile</Text>

                            {/* <View style={[styles.dividerView, { width: 60, }]}></View> */}


                            <View style={styles.floatView}>

                                {/* ===================== custom bottom sheet================= */}

                                <View style={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: 70,
                                    backgroundColor: '#fff',
                                    justifyContent: 'flex-end',
                                    alignSelf: 'center',
                                    elevation: 5,
                                    flexDirection: 'row',
                                }}>

                                    <View style={{ alignItems: 'center', flex: 1, marginLeft: 30, }}>
                                        <Image
                                            source={{ uri: image }}
                                            style={{
                                                width: 140,
                                                height: 140,
                                                borderRadius: 70,
                                            }}
                                            resizeMode="cover"  // Use 'cover' to maintain the aspect ratio and cover the entire container
                                        />



                                    </View>
                                    <TouchableOpacity style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 25,
                                        backgroundColor: '#000',
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        marginTop: 60
                                    }}
                                        onPress={() => {
                                            setVisible(true)
                                        }}>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: 700,
                                            color: '#fff',
                                            textAlign: 'center'
                                        }}>+</Text>

                                    </TouchableOpacity>

                                    <Modal
                                        style={{
                                            marginLeft: 0,
                                            marginBottom: 0,
                                            width: '100%',
                                        }}
                                        isVisible={visible}
                                        onBackButtonPress={() => {
                                            setVisible(false);
                                        }}>
                                        <View style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: 200,
                                            backgroundColor: '#fff',
                                            width: '100%',
                                            borderTopLeftRadius: 20,
                                            borderTopRightRadius: 20,
                                        }}>
                                            <Text style={{
                                                fontFamily: 'Philosopher-Bold',
                                                fontSize: 25,
                                                color: '#000',
                                                marginTop: 10,
                                                marginLeft: 10
                                            }}>Profile</Text>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-evenly',
                                                marginTop: 30
                                            }}>
                                                <TouchableOpacity
                                                    style={styles.profilePhotoToch}
                                                    onPress={takePhotoFromCamera}
                                                >
                                                    <Entypo name="camera" color={"#c27b7f"} size={25}
                                                        style={{
                                                            marginTop: 20,
                                                            fontWeight: 'bold'
                                                        }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.profilePhotoToch}
                                                    onPress=
                                                    {choosePhotoFromLibrary}
                                                >
                                                    <FontAwesome name="photo" color={"#c27b7f"} size={25}
                                                        style={{
                                                            marginTop: 20,
                                                            fontWeight: 'bold'
                                                        }} />
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={styles.profilePhotoToch}
                                                    onPress={() => {
                                                        setImage(''); // Reset the image when removing the profile
                                                        setRemoveImage(1); // Set removeImage to 1 when removing the profile
                                                    }}
                                                >
                                                    <AntDesign name="delete" color={"#c27b7f"} size={25}
                                                        style={{
                                                            marginTop: 20,
                                                            fontWeight: 'bold'
                                                        }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>
                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        placeholder='First Name'
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000', }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        autoCompleteType="first_name"
                                        keyboardType="name-phone-pad"
                                        value={first_name}
                                        onChangeText={setFirstName}
                                    />
                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        placeholder='Last Name'
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000' }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        autoCompleteType="last_name"
                                        keyboardType="name-phone-pad"
                                        value={last_name}
                                        onChangeText={setLastName}

                                    />
                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        placeholder='Email'
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000' }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        autoCompleteType="last_name"
                                        keyboardType="name-phone-pad"
                                        value={email}
                                        onChangeText={setEmail}

                                    />
                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        placeholder='Phone No.'
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000' }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        autoCompleteType="last_name"
                                        keyboardType="name-phone-pad"
                                        value={phone}
                                        onChangeText={setPhone}
                                    />
                                </View>


                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        placeholder='Plot no./Floor/Street'
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000' }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        keyboardType="name-phone-pad"
                                        value={address_1}
                                        onChangeText={setAddress1}
                                    />

                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        placeholder='Landmark/Area'
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000' }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        keyboardType="name-phone-pad"
                                        value={address_2}
                                        onChangeText={setAddress2}
                                    />

                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        placeholder='State'
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000' }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        keyboardType="name-phone-pad"
                                        value={state}
                                        onChangeText={setState}
                                    />

                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        placeholder='City'
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000' }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        keyboardType="name-phone-pad"
                                        value={city}
                                        onChangeText={setCity}
                                    />

                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        placeholder='Zip'
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000' }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        keyboardType="number-pad"
                                        value={zip.toString()}
                                        onChangeText={setZip}
                                    />

                                </View>
                                <View style={{
                                    marginTop: 5,
                                    marginLeft: 15,
                                    flexDirection: 'row',
                                    gap: 10
                                }}>

                                    {Plan_exist !== null ?
                                        (<TouchableOpacity
                                            style={styles.saveTouch}
                                            onPress={() => {

                                                handleSave();
                                                navigation.navigate('Userr');
                                            }}
                                        >
                                            <Text style={styles.profileButtons}>Save</Text>

                                        </TouchableOpacity>) : (<Text style={styles.profileButtons1}>Save</Text>)}

                                    <TouchableOpacity
                                        style={styles.saveTouch}
                                        //
                                        onPress={() =>
                                            navigation.goBack()
                                        }
                                    >
                                        <Text style={styles.profileButtons}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                );
            }}
        </Theme>
    );
};

export default Profile;


