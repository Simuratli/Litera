import ForYou from "@/containers/for-you";
import PopularPosts from "@/containers/popular-posts";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { View } from "react-native";

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <View className="flex-1 bg-paper">
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#FAF7F2",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: "#E8E0D5",
          },
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "600",
            textTransform: "none",
            fontFamily: "PlayfairDisplay-Medium",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#2C1810",
          },
        }}
      >
        <Tab.Screen name="Popular Posts" component={PopularPosts} />
        <Tab.Screen name="For you" component={ForYou} />
      </Tab.Navigator>
    </View>
  );
};

export default Home;
