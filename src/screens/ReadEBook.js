import { View,StyleSheet, Dimensions,} from 'react-native';
import React from 'react'

import Pdf from 'react-native-pdf';

const ReadEBook = () => {
  return (
    <View style={styles.container}>
                <Pdf
                trustAllCerts={false}
                    source={{uri:'https://dindayalupadhyay.smartcitylibrary.com/public_uploads_ebooks/2023-08-11_64d616f1c3571_4fee7f518a65d32044d8144cb8d4e7358b5cdb20'}}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}
                   // enablePaging={true}
                   />
            </View>
  );
};

export default ReadEBook;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});

// import { View, Text } from 'react-native'
// import React from 'react'

// const ReadEBook = () => {
//   return (
//     <View>
//       <Text>ReadEBook</Text>
//     </View>
//   )
// }

// export default ReadEBook;