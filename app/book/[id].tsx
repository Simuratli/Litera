import Loader from "@/components/loader";
import { supabase } from "@/lib/supabase";
import { BookType } from "@/types/global";
import { resolveSource } from "@/utils/image.util";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function BookDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  console.log(id, "book slug param");

  const [book, setBook] = useState<BookType | null>(null);
  const [refreshing, setrefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("books")
      .select("*, author:authors(name)")
      .eq("slug", id)
      .single();

    console.log("Fetched book data:", data);
    if (data) {
      setBook(data);
    } else {
      setBook(null);
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    setrefreshing(true);
    await fetchBooks();
    setrefreshing(false);
  };

  useEffect(() => {
    fetchBooks();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!book) {
    return (
      <View className="flex-1 bg-paper items-center justify-center">
        <Text className="text-ink font-playfair">Book not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-paper"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View className="bg-gradient-to-b from-surface2 to-paper pb-8">
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-12 left-5 z-10 w-9 h-9 rounded-full bg-surface items-center justify-center border border-border"
          style={{ shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4 }}
        >
          <Ionicons name="chevron-back" size={20} color="#2C1810" />
        </TouchableOpacity>

        {/* Cover */}
        <View className="items-center pt-20">
          <View
            className="w-40 h-56 rounded-xl overflow-hidden shadow-lg bg-surface2"
            style={{
              elevation: 8,
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 12,
            }}
          >
            {book.cover_url ? (
              <Image
                source={resolveSource(book.cover_url)}
                contentFit="cover"
                cachePolicy="none"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <View className="w-full h-full bg-surface2 items-center justify-center">
                <Ionicons name="book-outline" size={48} color="#8B7355" />
              </View>
            )}
          </View>
        </View>

        {/* Info */}
        <View className="items-center mt-6 px-8">
          <Text className="text-3xl font-playfair-bold text-ink text-center leading-snug">
            {book.title}
          </Text>
          <View className="mt-2 px-3 py-1 rounded-full bg-surface2 border border-border">
            <Text className="text-base font-playfair-md text-umber text-center">
              {book.author?.name || "Unknown Author"}
            </Text>
          </View>
          <Text className="text-base font-playfair-md text-umber text-center mt-4">
            {book.description || "No description available."}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
