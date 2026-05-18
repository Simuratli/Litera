import React from "react";
import { ActivityIndicator, View } from "react-native";

const Loader = () => {
  return (
    <View className="py-10 items-center">
      <ActivityIndicator size="large" color="#8B7355" />
    </View>
  );
};

export default Loader;
