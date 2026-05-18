import React from "react";
import { Text, View } from "react-native";

const Badge = ({ label }: { label: string }) => {
  return (
    <View className="py-2 px-4 rounded-xl bg-surface">
      <Text>{label}</Text>
    </View>
  );
};

export default Badge;
