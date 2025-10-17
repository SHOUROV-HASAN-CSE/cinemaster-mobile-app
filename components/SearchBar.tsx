import { View, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  placeholder: string;
  value?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-100 px-5 py-1 rounded-full">
      <Ionicons name="search" size={20} color="#f97216" />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="rgba(255,255,255,0.5)"
        className="ml-2 flex-1 text-lg text-white"
      />
    </View>
  );
};

export default SearchBar;
