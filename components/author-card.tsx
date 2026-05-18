import { Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

type AuthorCardProps = {
  name: string;
  avatar?: any;
  type: "search" | "profile" | "bookmark";
  href?: Parameters<typeof Link>[0]["href"];
};

const AuthorCard = ({ name, avatar, type, href }: AuthorCardProps) => {
  if (type === "bookmark") {
    const content = (
      <View className="flex-row items-center gap-4 py-3 border-b border-border">
        <View className="w-20 h-28 rounded-[6px] bg-surface overflow-hidden items-center justify-center border border-border">
          {avatar ? (
            <Image
              source={avatar}
              contentFit="cover"
              cachePolicy="none"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Octicons name="person" size={28} color="#8B7355" />
          )}
        </View>
        <View className="flex-1">
          <Text
            className="text-ink text-lg font-playfair-bold"
            numberOfLines={2}
          >
            {name}
          </Text>
        </View>
      </View>
    );
    return href ? <Link href={href}>{content}</Link> : content;
  }

  if (type === "search") {
    const content = (
      <View className="flex-row items-center gap-3 py-3">
        <View className="w-9 h-9 rounded-full bg-surface overflow-hidden items-center justify-center border border-[#8B7355]">
          {avatar ? (
            <Image
              source={avatar}
              contentFit="cover"
              cachePolicy="none"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Octicons name="person" size={18} color="#8B7355" />
          )}
        </View>
        <Text numberOfLines={1} className="text-ink text-md font-playfair">
          {name}
        </Text>
      </View>
    );
    return href ? <Link href={href}>{content}</Link> : content;
  }

  // profile variant
  return (
    <View className="items-center gap-2 py-3 w-20">
      <View className="w-16 h-16 rounded-full bg-surface overflow-hidden items-center justify-center border border-[#8B7355]">
        {avatar ? (
          <Image
            source={avatar}
            contentFit="cover"
            cachePolicy="none"
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Octicons name="person" size={28} color="#8B7355" />
        )}
      </View>
      <Text
        numberOfLines={1}
        className="text-ink text-xs font-playfair text-center"
      >
        {name}
      </Text>
    </View>
  );
};

export default AuthorCard;
