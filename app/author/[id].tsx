import Loader from "@/components/loader";
import { supabase } from "@/lib/supabase";
import { AuthorType, BookType } from "@/types/global";
import { resolveSource } from "@/utils/image.util";
import { Ionicons, Octicons } from "@expo/vector-icons";
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

export default function AuthorDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true); // yeni state
  const [author, setAuthor] = useState<AuthorType | null>(null);
  const [books, setBooks] = useState<BookType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const fetchAuthorAndBooks = async () => {
    setLoading(true);
    const { data: authorData } = await supabase
      .from("authors")
      .select("*")
      .eq("slug", id)
      .single();

    if (authorData) setAuthor(authorData);

    if (authorData?.id) {
      const { data: booksData } = await supabase
        .from("books")
        .select("*")
        .eq("author_id", authorData.id);

      if (booksData) setBooks(booksData);
    }
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAuthorAndBooks();
    setRefreshing(false);
  };

  // useEffect içinde fonksiyonu dışarı al:
  useEffect(() => {
    fetchAuthorAndBooks();
  }, [id]);

  if (loading) return <Loader />;

  if (!author) {
    return (
      <View className="flex-1 bg-paper items-center justify-center">
        <Text className="text-ink font-playfair">Author not found.</Text>
      </View>
    );
  }

  if (!author) {
    return (
      <View className="flex-1 bg-paper items-center justify-center">
        <Text className="text-ink font-playfair">Author not found.</Text>
      </View>
    );
  }
  return (
    <ScrollView
      className="flex-1 bg-paper"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-5 z-10 w-9 h-9 rounded-full bg-surface items-center justify-center border border-border"
      >
        <Ionicons name="chevron-back" size={20} color="#2C1810" />
      </TouchableOpacity>

      {/* Avatar + Name */}
      <View className="items-center pt-24 pb-8 bg-surface">
        <View className="w-28 h-28 rounded-full overflow-hidden bg-surface2 border border-border items-center justify-center">
          {author.avatar_url ? (
            <Image
              source={resolveSource(author.avatar_url)}
              contentFit="cover"
              cachePolicy="none"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Octicons name="person" size={36} color="#8B7355" />
          )}
        </View>
        <View className="w-full flex-row items-center gap-2 mt-4">
          <Text className="font-playfair w-full text-3xl text-center text-ink">
            {author.name}
          </Text>
        </View>
        <View className="w-full flex-row items-center gap-2 mt-4">
          <Text className="font-playfair w-full text-md text-center text-ink">
            {author.bio}
          </Text>
        </View>
      </View>

      {/* Books */}
      {books.length > 0 && (
        <View className="px-6 pt-6">
          <Text className="text-base font-playfair-bold text-ink mb-3">
            Books
          </Text>
          {books.map((book) => (
            <TouchableOpacity
              key={book.id}
              onPress={() =>
                router.push({
                  pathname: "/book/[id]",
                  params: { id: book.slug },
                })
              }
              className="flex-row items-center gap-4 py-3 border-b border-border"
            >
              <View className="w-12 h-16 rounded bg-surface2 overflow-hidden">
                {book.cover_url && (
                  <Image
                    source={resolveSource(book.cover_url)}
                    contentFit="cover"
                    cachePolicy="none"
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </View>
              <View className="flex-1">
                <Text
                  className="text-ink text-sm font-playfair-bold"
                  numberOfLines={2}
                >
                  {book.title}
                </Text>
                <Text className="text-dust text-xs font-playfair mt-0.5">
                  {author.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Quotes */}
      {/* {quotes.length > 0 && (
        <View className="px-6 pt-6 pb-10">
          <Text className="text-base font-playfair-bold text-ink mb-3">
            Quotes
          </Text>
          {quotes.map((q) => (
            <View key={q.id} className="py-4 border-b border-border">
              <Text className="text-ink font-playfair-md text-sm leading-relaxed italic">
                "{q.quote}"
              </Text>
              <Text className="text-dust text-xs font-playfair mt-2">
                {q.source}
                {q.page ? `, p.${q.page}` : ""}
              </Text>
            </View>
          ))}
        </View>
      )} */}
    </ScrollView>
  );
}
