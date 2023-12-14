import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const FilterData = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text>Hi</Text>
            <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff' }}>

                <FlatList
                    numColumns={2}
                    contentContainerStyle={{ columnGap: -10 }}
                    keyExtractor={(item) => item.id.toString()}
                    // data={filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}

                    renderItem={({ item, id }) =>

                        <TouchableOpacity onPress={() => {
                            navigation.navigate('BooksDetailPage', { data: item })
                        }}>

                            <View style={{
                                width: 145,
                                height: 280,
                                marginEnd: 50,
                            }}>
                                <View style={{
                                    elevation: 5,
                                    borderRadius: 5,
                                    color: '#000'
                                }}>
                                    <Image source={{ uri: item.image_path }}
                                        style={{
                                            aspectRatio: 0.8,
                                            resizeMode: 'cover',
                                            borderRadius: 10,

                                        }}
                                    />
                                    
                                </View>

                                <View style={{ padding: 10, }}>
                                    <Text style={{
                                        fontSize: 15,
                                        marginLeft: -10,
                                        fontFamily: 'philosopher-bold',
                                    }} numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                    {item.library_id === 111 ?
                                        (<Text
                                            style={{
                                                marginLeft: -10,
                                                fontSize: 12
                                            }}
                                        >
                                            Dindayal UpadhyayLibrary</Text>) :
                                        (item.library_id === 222 ?
                                            (<Text
                                                style={{
                                                    marginLeft: -12,
                                                    fontSize: 12
                                                }}
                                            >
                                                Kundanlal Gupta Library</Text>) :
                                            (<Text
                                                style={{
                                                    marginLeft: -8,
                                                    fontSize: 12

                                                }}
                                            >
                                                Rashtramata Kasturba Library</Text>))}


                                    {item.items[0].format === 3 ?

                                        <Image
                                            source={require('../images/ebook.png')}
                                            style={{ height: 20, width: 20, marginLeft: -8, }}
                                        />
                                        :

                                        <Image
                                            source={require('../images/bookfill.png')}
                                            style={{ height: 20, width: 20, marginLeft: -8, }}
                                        />
                                    }
                                </View>

                            </View>

                        </TouchableOpacity>

                    }
                />

            </View>
        </View>
    )
}

export default FilterData;