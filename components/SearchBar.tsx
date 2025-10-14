import { View, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'



interface Props {
  placeholder: string;
  onPress?: () => void;
}


const SearchBar = ({placeholder, onPress}: Props  ) => {
  return (
    <View className='flex-row items-center bg-dark-100 px-5 py-2 rounded-full'>
       <Ionicons name="search" size={20} color="#f20000" />
      <TextInput
      onPress={onPress}
        placeholder={placeholder}
        value=''
        onChangeText={() => {}}
        placeholderTextColor="#fff"   //"#ab8bff"
        className="ml-3 flex-1 text-xl text-white"
      />
    </View>
  )
}

export default SearchBar  