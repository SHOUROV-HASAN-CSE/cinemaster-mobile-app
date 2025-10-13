import { Link } from 'expo-router';
import { Text, View } from 'react-native';


export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl text-dark-200">Welcome to the Cinemaster</Text>
      <Text className="text-2xl text-accent">Welcome to the world</Text>


      <Link href="/about"> About</Link>
      <Link href="/movies/avengers"> Avengers</Link>
    </View>
  );
}
