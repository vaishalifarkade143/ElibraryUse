
import { View, Text, ScrollView, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../common/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import ImagePicker from 'react-native-image-crop-picker';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';

const Profile = ({ navigation }) => {

    const [image, setImage] = useState('');
    const { userInfo, userToken } = useContext(AuthContext);

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address_1, setAddress1] = useState();
    const [address_2, setAddress2] = useState();
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [profile, setProfile] = useState([]);
    // const { userToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setIsData] = useState(false);
    const [removeImage, setRemoveImage] = useState(0);
   
    //======================image========================
    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log("image after chang:", image);
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
            console.log("image after chang:", image);
            setImage(image.path);
            setRemoveImage(0); // Reset the removeImage flag
            Alert.alert(
                'Success!',
                `Image set successfully `,
            );
        });
    }



    const before_plan=()=>{

        if(userToken!==null)
      {
        setFirstName(userInfo.data.user.first_name);
        setLastName(userInfo.data.user.last_name);
        setPhone(userInfo.data.user.phone);
        setEmail(userInfo.data.user.email);
      }
      }


    useEffect(() => {
        // Fetch user profile data on component load
        
        if (userToken !== null && userInfo.data.user.membership_plan_name !== null) {
           
        fetchProfileData();
        }
        else {before_plan()}
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
                setAddress1(res.data.address.address_1);
                setAddress2(res.data.address.address_2);
                setState(res.data.address.state);
                setCity(res.data.address.city);
                setZip(res.data.address.zip);
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
                        <Header
                            rightIcon={require('../images/Logoelibrary.png')}
                            leftIcon={require('../images/menu.png')}
                            onClickLeftIcon={() => {
                                navigation.openDrawer();
                            }}
                        />
                        <ScrollView>

                            <Text style={styles.sectionHeading}>Profile</Text>

                            {/* line starts ============== */}
                            <View style={[styles.dividerView, { width: 60, marginLeft: 150, }]}></View>
                            {/* line ends ============== */}

                            {/* <Spinner visible={isLoading} style={{ color: 'yellow' }} /> */}
                            <View style={styles.floatView}>
                                <View
                                    style={styles.profileView}>
                                    <Text style={styles.profileText}>First Name</Text>
                                    <Text style={styles.profileStar}>*</Text>
                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000' }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        autoCompleteType="first_name"
                                        keyboardType="name-phone-pad"
                                        value={first_name}
                                        onChangeText={setFirstName}
                                    />
                                </View>
                                <View
                                    style={styles.profileView}>
                                    <Text style={styles.profileText}>Last Name</Text>
                                    <Text style={styles.profileStar}>*</Text>
                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000' }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        autoCompleteType="last_name"
                                        keyboardType="name-phone-pad"
                                        value={last_name}
                                        onChangeText={setLastName}

                                    />
                                </View>

                                <View
                                    style={styles.profileView}>
                                    <Text style={styles.profileText}>Email</Text>
                                    <Text style={styles.profileStar}>*</Text>
                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000' }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        autoCompleteType="last_name"
                                        keyboardType="name-phone-pad"
                                        value={email}
                                        onChangeText={setEmail}

                                    />
                                </View>

                                <View
                                    style={styles.profileView}>
                                    <Text style={styles.profileText}>Phone No.</Text>
                                    <Text style={styles.profileStar}>*</Text>
                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000' }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        autoCompleteType="last_name"
                                        keyboardType="name-phone-pad"
                                        value={phone}
                                        onChangeText={setPhone}
                                    />
                                </View>

                                <View
                                    style={{

                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: "row",
                                        marginTop: 15,
                                        marginLeft: 15,
                                        marginRight: 15,
                                    }}>
                                    <Text style={styles.profileText}>Member Profile</Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 20,
                                }}>
                                    <View
                                        style={{
                                            height: 130,
                                            width: 130,
                                            backgroundColor: '#cbb7b8',
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: 30,
                                            marginTop: 15,
                                        }}>
                                        {image ?
                                            (<ImageBackground
                                                source={{
                                                    uri: image,
                                                }}
                                                style={{
                                                    height: 130,
                                                    width: 130,
                                                }}
                                                imageStyle={{ borderRadius: 15 }} />)
                                            :
                                            (<Text style={{
                                                fontSize: 18,
                                                borderRadius: 80,
                                                padding: 35,
                                                backgroundColor: '#7d68f0'
                                            }}>{first_name.charAt(0).toUpperCase() + "" + last_name.charAt(0).toUpperCase()}</Text>)
                                        }
                                    </View>

                                    <View style={{
                                        marginTop: -25,
                                        alignItems: 'center'

                                    }}>
                                        <TouchableOpacity
                                            style={styles.profilePhotoToch}
                                            onPress={takePhotoFromCamera}
                                        >
                                            <Text style={styles.profilePhoto}>Take Photo</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={styles.profilePhotoToch}
                                            onPress=
                                            {choosePhotoFromLibrary}
                                        >
                                            <Text style={styles.profilePhoto}>Choose from Gallary</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={styles.profilePhotoToch}
                                            onPress={() => {
                                                setImage(''); // Reset the image when removing the profile
                                                setRemoveImage(1); // Set removeImage to 1 when removing the profile
                                            }}
                                        >
                                            <Text style={styles.profilePhoto}>Remove Profile</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>


                                <View
                                    style={styles.profileView}>
                                    <Text style={styles.profileText}>Address1</Text>
                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000' }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        keyboardType="name-phone-pad"
                                        value={address_1}
                                        onChangeText={setAddress1}
                                    />

                                </View>

                                <View
                                    style={styles.profileView}>
                                    <Text style={styles.profileText}>Address2</Text>
                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000' }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        keyboardType="name-phone-pad"
                                        value={address_2}
                                        onChangeText={setAddress2}
                                    />

                                </View>

                                <View
                                    style={styles.profileView}>
                                    <Text style={styles.profileText}>State</Text>
                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000' }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        keyboardType="name-phone-pad"
                                        value={state}
                                        onChangeText={setState}
                                    />

                                </View>

                                <View
                                    style={styles.profileView}>
                                    <Text style={styles.profileText}>City</Text>
                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
                                        style={{ color: theme === 'LIGHT' ? 'grey' : '#000' }}
                                        placeholderTextColor={theme === 'LIGHT' ? 'grey' : '#000'}
                                        keyboardType="name-phone-pad"
                                        value={city}
                                        onChangeText={setCity}
                                    />

                                </View>

                                <View
                                    style={styles.profileView}>
                                    <Text style={styles.profileText}>Zip Code</Text>
                                </View>
                                <View
                                    style={styles.profileTextView}>
                                    <TextInput
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
                                    <TouchableOpacity
                                        style={styles.saveTouch}
                                        // onPress={handleSave}

                                        onPress={() => {
                                            handleSave();
                                            navigation.navigate('Userr');
                                        }}
                                    // disabled={!isData}
                                    >
                                        {/* { isData?( */}
                                        <Text style={styles.profileButtons}>Save</Text>

                                    </TouchableOpacity>

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
