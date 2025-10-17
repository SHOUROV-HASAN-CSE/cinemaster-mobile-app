import 'dotenv/config';

export default {
  expo: {
     name: 'Cinemaster',
    slug: 'cinemaster',
    version: '1.0.0',
    icon: './assets/images/icon.png',  
    android: {
      "jsEngine": "hermes",
      package: 'com.shourov.cinemaster',
      adaptiveIcon: {
        foregroundImage: './assets/images/icon.png',
        backgroundColor: '#fff' 
      },
    },
    extra: {
      apiKey: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
      eas: {
        projectId: '9799dcb3-6973-4e57-80a1-fbd0e6f9d456' 
      }
        },
  }
};



  