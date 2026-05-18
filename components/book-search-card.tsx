import { resolveSource } from "@/utils/image.util";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

type BookSearchCardProps = {
  title: string;
  author: string;
  cover?: any;
  variant?: "compact" | "large";
  href?: Parameters<typeof Link>[0]["href"];
};

const BookSearchCard = ({
  title,
  author,
  cover,
  variant = "compact",
  href,
}: BookSearchCardProps) => {
  if (variant === "large") {
    const content = (
      <View className="flex-row items-center gap-4 py-3 border-b border-border">
        <View className="w-20 h-28 rounded bg-surface overflow-hidden shadow-sm">
          {cover ? (
            <Image
              source={resolveSource(cover)}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full bg-surface2" />
          )}
        </View>
        <View className="flex-1 gap-1">
          <Text
            className="text-ink text-lg font-playfair-bold leading-snug"
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text className="text-umber text-sm font-playfair-md mt-0.5">
            {author}
          </Text>
        </View>
      </View>
    );

    return href ? (
      <Link href={href} style={{ opacity: 1 }}>
        {content}
      </Link>
    ) : (
      content
    );
  }

  const compactContent = (
    <View className="flex-row items-center gap-3 py-3">
      <View className="w-10 h-14 rounded-sm bg-surface overflow-hidden">
        {cover && (
          <Image
            source={resolveSource(cover)}
            className="w-full h-full"
            resizeMode="cover"
          />
        )}
      </View>
      <View className="flex-1">
        <Text className="text-ink text-sm font-playfair-md">{title}</Text>
        <Text className="text-dust text-xs font-playfair mt-0.5">{author}</Text>
      </View>
    </View>
  );

  return href ? (
    <Link href={href} style={{ opacity: 1 }}>
      {compactContent}
    </Link>
  ) : (
    compactContent
  );
};

export default BookSearchCard;
