import AuthorCard from "@/components/author-card";
import BookSearchCard from "@/components/book-search-card";
import Loader from "@/components/loader";
import { supabase } from "@/lib/supabase";
import { AuthorType, BookType } from "@/types/global";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const Search = () => {
  const [query, setQuery] = useState("");
  const [authors, setAuthors] = useState<AuthorType[]>([]);
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    let ignore = false;
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const fetchResults = async () => {
        setLoading(true);

        if (!query.trim()) {
          if (!ignore) {
            setAuthors([]);
            setBooks([]);
            setLoading(false);
          }
          return;
        }

        const { data: filteredAuthors } = await supabase
          .from("authors")
          .select("*")
          .ilike("name", `%${query}%`);

        const matchingAuthorIds = (filteredAuthors || []).map((a) => a.id);

        let bookQuery = supabase
          .from("books")
          .select("*, author:authors(name)");

        if (matchingAuthorIds.length > 0) {
          bookQuery = bookQuery.or(
            `title.ilike.%${query}%,author_id.in.(${matchingAuthorIds.join(",")})`,
          );
        } else {
          bookQuery = bookQuery.ilike("title", `%${query}%`);
        }

        const { data: filteredBooks } = await bookQuery;

        if (!ignore) {
          setAuthors(filteredAuthors || []);
          setBooks(filteredBooks || []);
          setLoading(false);
        }
      };

      fetchResults();
    }, 400);

    return () => {
      ignore = true;
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
    >
      <View className="bg-paper flex-1 p-5">
        <Text className="text-2xl font-medium font-playfair">Search</Text>
        <View className="mt-5 flex-row items-center rounded-2xl px-4 gap-3 h-12 shadow-sm bg-paper border border-border">
          <Ionicons name="search-outline" size={18} color="#A89880" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Book, author, quote..."
            placeholderTextColor="#A89880"
            className="flex-1 text-ink text-sm font-playfair bg-paper"
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {authors.length > 0 && (
            <Text className="text-2xl font-medium font-playfair mt-5 mb-5">
              Featured Authors
            </Text>
          )}

          {loading && <Loader />}

          {authors.map((item) => (
            <AuthorCard
              key={item.id}
              type="search"
              name={item.name}
              href={{ pathname: "/author/[id]", params: { id: item.slug } }}
              avatar={item.avatar_url}
            />
          ))}

          {books.length > 0 && (
            <Text className="text-2xl font-medium font-playfair mt-5 mb-5">
              Featured Books
            </Text>
          )}

          {books.map((item) => (
            <BookSearchCard
              key={item.id}
              title={item.title}
              author={item.author?.name || "Unknown"}
              cover={item.cover_url}
              href={{ pathname: "/book/[id]", params: { id: item.slug } }}
            />
          ))}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Search;
