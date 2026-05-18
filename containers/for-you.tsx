import ShareCard from "@/components/share-card";
import { CardData, FEED_DATA } from "@/constants/data";
import React from "react";
import { FlatList } from "react-native";

const ForYou = () => {
  return (
    <FlatList
      data={FEED_DATA}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16, gap: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }: { item: CardData }) => (
        <ShareCard
          quote={item.quote}
          source={item.source}
          author={item.author}
          page={item.page}
          username={item.username}
          likes={item.likes}
        />
      )}
    />
  );
};

export default ForYou;
