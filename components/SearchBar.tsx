import { View, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'



interface Props {
  placeholder: string;
  value?: string
  onPress?: () => void;
  onChangeText?: (text: string) => void
}


const SearchBar = ({placeholder, onPress, value, onChangeText }: Props  ) => {
  return (
    <View className='flex-row items-center bg-dark-100 px-5 py-2 rounded-full'>
       <Ionicons name="search" size={20} color="#f20000" />
      <TextInput
      onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#fff"   //"#ab8bff"
        className="ml-3 flex-1 text-xl text-white"
      />
    </View>
  )
}

export default SearchBar  