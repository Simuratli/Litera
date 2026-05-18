import AuthorCard from "@/components/author-card";
import BookSearchCard from "@/components/book-search-card";
import ShareCard from "@/components/share-card";
import { AUTHOR_DATA, BOOK_DATA, FEED_DATA } from "@/constants/data";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const TABS = ["Books", "Quotes", "Authors"] as const;
type Tab = (typeof TABS)[number];

const Bookmarks = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Books");
  const router = useRouter();

  return (
    <View className="flex-1 bg-paper">
      {/* Header */}
      <View className="px-5 pt-5 pb-2 mb-3">
        <Text className="text-2xl font-playfair-bold text-ink">Bookmarks</Text>
      </View>

      {/* Tab Bar */}
      <View className="flex-row border-b border-border mx-5">
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className="flex-1 items-center pb-3 relative"
          >
            <Text
              className={`text-base font-playfair-md ${
                activeTab === tab ? "text-ink" : "text-dust"
              }`}
            >
              {tab}
            </Text>
            {activeTab === tab && (
              <View className="absolute bottom-0 left-0 right-0 h-[2px] bg-ink rounded-full" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {activeTab === "Books" && (
        <FlatList
          data={BOOK_DATA}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20, gap: 4 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <BookSearchCard
              title={item.title}
              author={item.author}
              cover={item.cover}
              variant="large"
              href={{ pathname: "/book/[id]", params: { id: item.id } }}
            />
          )}
        />
      )}

      {activeTab === "Quotes" && (
        <FlatList
          data={FEED_DATA}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20, gap: 24 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
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
      )}

      {activeTab === "Authors" && (
        <FlatList
          data={AUTHOR_DATA}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20, gap: 4 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <AuthorCard
              type="bookmark"
              name={item.name}
              avatar={item.avatar}
              href={{ pathname: "/author/[id]", params: { id: item.id } }}
            />
          )}
        />
      )}
    </View>
  );
};

export default Bookmarks;
