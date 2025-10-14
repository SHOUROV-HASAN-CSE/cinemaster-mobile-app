import SearchBar from '@/components/SearchBar';
import { ScrollView, View, Image } from 'react-native';
import {images} from '@/assets/images';
import { useRouter } from 'expo-router';



export default function Index() {

const router = useRouter();



  return (
    <View className="flex-1 bg-primary">

     <Image source={images.cinemaster} className="w-full h-32" resizeMode="contain" />

      <ScrollView className='flex-1 px-5' showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: '100%', paddingBottom: 10}}>

        <View className='flex-1 mt-5'>

          <SearchBar onPress={() => router.push('/search')} placeholder="Search for a movie"/>

        </View>

      </ScrollView>
    </View>
  );
}
