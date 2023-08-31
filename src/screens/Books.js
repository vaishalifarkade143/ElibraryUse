import { View, Text } from 'react-native'
import React from 'react'

const Books = () => {
  return (
    <View>
      <Text>Books</Text>
    </View>
  )
}

export default Books;
        
// import React, { useState } from 'react';
// import { View, Text, Picker } from 'react-native';

// const App = () => {
//   const [selectedGenre, setSelectedGenre] = useState("Search By Genre");
//   const genres = [
//     "Search By Genre",
//     "Art", "Biography", "Business", "Comics", "Contemporary", "Crime", "Fantasy",
//     "Fiction", "Novels", "History", "Horror", "Humor and Comedy", "Music", "Mystery",
//     "Nonfiction", "Philosophy", "Poetry", "Psychology", "Religion", "Romance",
//     "Science", "Educational", "Civil service", "Mathematics", "Suspense",
//     "Spirituality", "Sports", "Thriller", "Travel", "Economics", "Politics",
//     "Atlas", "Banking", "Physics", "General Knowledge", "Story", "Polity",
//     "Biology", "Chemistry", "UPSC"
//   ];

//   return (
//     <View style={{ paddingHorizontal: 16 }}>
//       <View style={{ marginVertical: 16 }}>
        
//         <Picker
//           selectedValue={selectedGenre}
//           onValueChange={(itemValue) => setSelectedGenre(itemValue)}
//         >
//           {genres.map((genre, index) => (
//             <Picker.Item key={index} label={genre} value={genre} />
//           ))}
//         </Picker>
//       </View>
//     </View>
//   );
// };

// export default App;