import React, { useState } from 'react';
import { TextInput } from 'react-native';


const SearchBarComponent = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      onSearch(searchText);
    }
  };

  return (
    <TextInput
      placeholder="Search..."
      value={searchText}
      onChangeText={setSearchText}
      onSubmitEditing={handleSearch}
    />
  );
};

export default SearchBarComponent;