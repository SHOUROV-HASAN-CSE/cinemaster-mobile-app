import { images } from "@/assets/images";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

const profile = () => {
  return (
    <View className="flex-1 items-center justify-center bg-[#462c1b]">
      <View
        style={{
          shadowColor: "#fb730b",
          shadowOffset: { width: 6, height: 6 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 6,
        }}
        className="bg-gray-200 p-6 rounded-3xl w-[23rem] h-[42rem] "
      >
        {/* Profile Image */}
        <View
          style={{
            shadowColor: "#000",
            shadowOffset: { width: -6, height: -6 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 6,
          }}
          className="rounded-full bg-[#fb730b] w-[135px] h-[135px] mx-auto -mt-20 items-center justify-center"
        >
          <Image source={images.profile} className="w-36 h-36 rounded-full" />
        </View>

        {/* Name & Role */}
        <Text className="text-gray-700 text-2xl font-bold text-center mt-3">
          MD. SHOUROV HASAN
        </Text>
        <Text className="text-gray-500 text-lg text-center mb-5">
          Software Engineer
        </Text>

        {/* Contact Info */}
        <View
          style={{
            shadowColor: "#fb730b",
            shadowOffset: { width: 6, height: 6 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 6,
          }}
          className="bg-blue-50 p-4 rounded-2xl mb-2"
        >
          <View className="flex-row items-center mb-2">
            <Ionicons name="call" size={25} color="#eb5e0f" />
            <Text className="text-gray-700 ml-3 text-md">01303-754647</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Ionicons name="mail" size={25} color="#eb5e0f" />
            <Text className="text-gray-700 ml-3 text-md">
              shourovhasan172@gmail.com
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="location" size={25} color="#eb5e0f" />
            <Text className="text-gray-700 ml-3 text-md">
              Nikunja-2, Dhaka, Bangladesh
            </Text>
          </View>
        </View>

        {/* Technologies */}
        <Text className="text-[#eb5e0f] text-lg text-center font-bold mb-2">
          Expart In
        </Text>

        <View className="flex-row justify-center flex-wrap mb-4">
          {[
            "JavaScript",
            "React JS",
            "Next.js",
            "React Native",
            "Tailwind",
          ].map((tech, index) => (
            <View
              key={index}
              style={{
                shadowColor: "#fb730b",
                shadowOffset: { width: 6, height: 6 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 4,
              }}
              className="bg-blue-50 px-5 py-2 m-1 rounded-full"
            >
              <Text className="text-[#eb5e0f] text-md">{tech}</Text>
            </View>
          ))}
        </View>

        {/* Social Icons */}
        <View className="flex-row justify-center gap-2 ">
          {[
            {
              href: "https://www.facebook.com/shourovhasan171/",
              icon: <Ionicons name="logo-facebook" size={24} color="#eb5e0f" />,
            },
            {
              href: "https://www.linkedin.com/in/mdshourovhasan/",
              icon: <Ionicons name="logo-linkedin" size={24} color="#eb5e0f" />,
            },
            {
              href: "https://github.com/SHOUROV-HASAN-CSE/",
              icon: <Ionicons name="logo-github" size={24} color="#eb5e0f" />,
            },
            {
              href: "https://shourovhasan.netlify.app/",
              icon: <FontAwesome name="globe" size={24} color="#eb5e0f" />,
            },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-blue-50 rounded-full shadow-inner w-12 h-12 items-center justify-center"
            >
              <Link href={item.href}>{item.icon}</Link>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Button */}
        <TouchableOpacity
          className="mt-5 bg-blue-50 px-4 py-3 mx-6 rounded-full items-center"
          style={{
            shadowColor: "#fb730b",
            shadowOffset: { width: 6, height: 6 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 6,
          }}
        >
          <Link
            href="https://wa.me/8801303754647?text=Hello%20Shourov.%20I%20am%20interested%20in%20your%20work.%20Can%20you%20please%20share%20more%20about%20your%20services.%20Thanks!
"
          >
            <Text className="text-[#eb5e0f] font-bold text-md">Contact Me</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default profile;
