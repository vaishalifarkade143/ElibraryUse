import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import Header from '../common/Header';
import Pdf from 'react-native-pdf';
import { useRoute, useNavigation } from '@react-navigation/native';

const ReadEBook = () => {
    const route = useRoute();
    const filename = route.params.data.file_name;
    const navigation = useNavigation();
    const [currentPage, setCurrentPage] = useState(1);

    // const pdfUrl = `https://dindayalupadhyay.smartcitylibrary.com/public_uploads_ebooks/${filename.slice(0, -4)}`;

    const pdfUrl = `https://dindayalupadhyay.smartcitylibrary.com/public_uploads_ebooks/${filename.split(".")[0]}`;

    return (
        <View style={styles.container}>
            <Header
                rightIcon={require('../images/Logoelibrary.png')}
                leftIcon={require('../images/back.png')}
                onClickLeftIcon={() => {
                    navigation.navigate('MyeBook');
                }}
            />
            {pdfModalVisible && (
                <Pdf
                    trustAllCerts={false}
                    source={{ uri: pdfUrl }}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        // console.log(`Current page: ${page}`);
                        setCurrentPage(page);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}
                />)
            }


            <View style={styles.pageButton}>
                <Text style={styles.pageButtonText}> {currentPage}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    pageButton: {
        position: 'absolute',
        bottom: 210,
        right: 0,
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 10,
    },
    pageButtonText: {
        color: 'white',
    },
});

export default ReadEBook;

