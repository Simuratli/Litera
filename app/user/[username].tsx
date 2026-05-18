import { FEED_DATA } from "@/constants/data";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function UserProfile() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const router = useRouter();

  // username param comes without '@', normalize both sides
  const normalized = username?.startsWith("@") ? username : `@${username}`;
  const quotes = FEED_DATA.filter((q) => q.username === normalized);

  return (
    <ScrollView
      className="flex-1 bg-paper"
      showsVerticalScrollIndicator={false}
    >
      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-5 z-10 w-9 h-9 rounded-full bg-surface items-center justify-center border border-border"
      >
        <Ionicons name="chevron-back" size={20} color="#2C1810" />
      </TouchableOpacity>

      {/* Avatar + Username */}
      <View className="items-center pt-24 pb-8 bg-surface">
        <View className="w-24 h-24 rounded-full overflow-hidden bg-surface2 border border-border items-center justify-center">
          <Octicons name="person" size={36} color="#8B7355" />
        </View>
        <Text className="text-2xl font-playfair-bold text-ink mt-4">
          {normalized}
        </Text>

        <View className="flex-row justify-between w-full px-8 mt-6 pt-6 border-t border-border">
          <View className="items-center">
            <Text className="text-2xl font-playfair-bold text-ink">321</Text>
            <Text className="text-xs font-playfair text-dust mt-0.5">
              Quotes
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-playfair-bold text-ink">24</Text>
            <Text className="text-xs font-playfair text-dust mt-0.5">
              Books
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-playfair-bold text-ink">50</Text>
            <Text className="text-xs font-playfair text-dust mt-0.5">
              Followers
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-playfair-bold text-ink">125</Text>
            <Text className="text-xs font-playfair text-dust mt-0.5">
              Following
            </Text>
          </View>
        </View>
      </View>

      {/* Quotes */}
      <View className="px-6 pt-6 pb-10">
        <Text className="text-base font-playfair-bold text-ink mb-3">
          Quotes
        </Text>
        {quotes.length === 0 ? (
          <Text className="text-dust font-playfair text-sm">
            No quotes yet.
          </Text>
        ) : (
          quotes.map((q) => (
            <View key={q.id} className="py-4 border-b border-border">
              <Text className="text-ink font-playfair-md text-sm leading-relaxed italic">
                "{q.quote}"
              </Text>
              <Text className="text-umber text-xs font-playfair-md mt-1">
                {q.source}
                {q.page ? `, p.${q.page}` : ""}
              </Text>
              <Text className="text-dust text-xs font-playfair mt-0.5">
                — {q.author}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
