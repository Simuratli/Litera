import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

type ShareCardProps = {
  quote: string;
  source: string;
  author: string;
  page?: string;
  username: string;
  likes: string;
  comments?: string;
  avatar?: any;
};

const ShareCard = ({
  quote = "People disappear when they die. Even those you love.",
  source = "Saraybosna Radyosu",
  author = "Tijan Sila",
  page = "41",
  username = "@yagmur",
  likes = "1.8k",
  comments = "24",
  avatar,
}: Partial<ShareCardProps>) => {
  return (
    <View className="w-full h-[350px] relative">
      {/* Background book image — offset right, rotated */}
      <View className="absolute   -right-2.5 w-[200px] h-[350px] rounded-xl overflow-hidden">
        <Image
          source={require("@/assets/images/BOOK.jpg")}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Main card */}
      <ImageBackground
        source={require("@/assets/images/paper-texture.jpg")}
        resizeMode="cover"
        className="absolute shadow-[8px_0_12px_-4px_rgba(0,0,0,0.2)] top-0 left-0 w-[95%] h-[350px] rounded-xl p-4 justify-between shadow-md elevation-4 overflow-hidden"
      >
        {/* Top section */}
        <View>
          {/* Opening quote mark */}
          <Text className="text-[28px] text-ink font-serif leading-7 mb-1">
            ❝
          </Text>

          {/* Quote text */}
          <Text className="text-[24px] text-ink font-serif leading-[35px] font-medium">
            {quote}
          </Text>

          {/* Divider */}
          <Text className="text-dust text-base my-2.5">—</Text>

          {/* Source info */}
          <Text className="text-[14px] text-umber font-serif font-semibold">
            {source}
          </Text>
          <Text className="text-[13px] text-umber font-serif">
            {author}
            {page ? ` - p. ${page}` : ""}
          </Text>
        </View>

        {/* Bottom row */}
        <View className="flex-row items-center justify-between">
          {/* Avatar + username */}
          <Link
            href={{
              pathname: "/user/[username]",
              params: { username: username.replace("@", "") },
            }}
            className="flex-row items-center gap-2"
          >
            <View className="w-9 h-9 rounded-full bg-accent overflow-hidden">
              {avatar ? (
                <Image
                  source={avatar}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="flex-1 bg-umber items-center justify-center">
                  <Ionicons name="person" size={18} color="#FAF7F2" />
                </View>
              )}
            </View>
            <Text className="text-[13px] text-umber font-medium">
              {username}
            </Text>
          </Link>

          {/* Actions */}
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Ionicons name="heart-outline" size={17} color="#8B7355" />
              <Text className="text-[13px] text-umber">{likes}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="chatbubble-outline" size={16} color="#8B7355" />
              <Text className="text-[13px] text-umber">{comments}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ShareCard;
