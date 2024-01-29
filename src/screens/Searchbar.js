import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';


const Searchbar = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [recentSearch, setRecentSearch] = useState([]);

    // const searcheddata = [];
    // searcheddata = searcheddata.concat(recentsearch);


    useEffect(() => {
        if (search !== "") {
            fetch(
                `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books-name?search=${search}&limit=5`
            )
                .then((res) => res.json())
                .then((data) => {
                    setMasterDataSource(data.data);
                    setFilteredDataSource(data.data);
                    //   setIsLoading(false);
                    // setisLoaded(false);

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [search]);

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.name
                        ? item.name.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(null);
            setSearch(text);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                setRecentSearch([item.name, ...recentSearch.slice(0, 4)]);
                navigation.navigate('BooksDetailPage', { data: item });
            }}>
                <View style={{ padding: 5, marginLeft: 10, flexDirection: 'row' }}>
                    <Text style={{
                        fontSize: 15, 
                        fontWeight: 'bold',
                        marginBottom: 10, marginLeft: 5
                    }} >
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderRecentSearchItem = (recentSearchItem) => {
        return (
            <View style={{ padding: 5, marginLeft: 10, flexDirection: 'row' }}>

                <Text style={{
                    fontSize: 15, 
                    fontWeight: 'bold',
                    marginBottom: 10,
                     marginLeft: 5
                }} >
                    {recentSearchItem}
                </Text>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, paddingTop: 10 }}>

            <View style={styles.searchBar}>

                <Feather name="search" color={"gray"} size={20}  />
                <TextInput
                    placeholderTextColor='#000'
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    // underlineColorAndroid="transparent"
                    placeholder="Search Here"
                />

                {/* {searchQuery !== '' && (
      <TouchableOpacity onPress={() => {
        setSearchQuery('');
        setSearchResults('');
      }}>
        <Feather name="x" color={"gray"} size={20} style={[styles.searchIcon, { justifyContent:'flex-end',}]} />
      </TouchableOpacity>)} */}

            </View>
            
            <FlatList
                data={search === '' ? recentSearch : filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                renderItem={search === '' ? ({ item }) => renderRecentSearchItem(item) : renderItem}
                ItemSeparatorComponent={() => (
                    <View
                        style={{
                            height: 0.5,
                            width: '100%',
                            backgroundColor: '#C8C8C8',
                        }}
                    />
                )}
                numColumns={1}
                contentContainerStyle={{ columnGap: 10 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({


    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 0.8,
        paddingHorizontal: 10,
        marginLeft: 10,
        marginRight: 10,
    },
});

export default Searchbar;
