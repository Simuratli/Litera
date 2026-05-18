import AuthorCard from "@/components/author-card";
import Badge from "@/components/badge";
import { AUTHOR_DATA } from "@/constants/data";
import { useAuth, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const Profile = () => {
  const { user } = useUser();
  const [notifVisible, setNotifVisible] = useState(false);
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || "");

  const updateUsername = async () => {
    try {
      await user?.update({ username: newUsername });
      await user?.reload();
      setEditingUsername(false);
    } catch (e: any) {
      alert(e.errors?.[0]?.message || "Failed to update username.");
    }
  };
  const notifications = [
    { id: "1", text: "Yagmur liked your quote." },
    { id: "2", text: "Tolkienfan started following you." },
    { id: "3", text: "Your quote got 100 likes!" },
  ];

  console.log("imageUrl:", user?.imageUrl);

  const pickAndUploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      const file = {
        uri,
        type: "image/jpeg",
        name: "profile.jpg",
      } as any;

      await user?.setProfileImage({ file });
      setLocalImage(uri);
      await user?.reload();
    }
  };

  const { signOut } = useAuth();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.replace("/(auth)/login");
  };
  if (signingOut) {
    return (
      <View className="flex-1 bg-paper items-center justify-center">
        <ActivityIndicator size="large" color="#2C1810" />
        <Text className="text-umber font-playfair mt-3 text-sm">
          Signing out...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="bg-paper h-full flex-1 p-5">
        <View className="flex justify-between flex-row my-2 items-center">
          <TouchableOpacity
            onPress={() => setNotifVisible(true)}
            className="p-1"
          >
            <View className="relative">
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#2C1810"
              />
              <View className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-error items-center justify-center"></View>
            </View>
          </TouchableOpacity>

          {/* Bildirim Modal */}
          <Modal
            visible={notifVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setNotifVisible(false)}
          >
            <Pressable
              className="flex-1"
              onPress={() => setNotifVisible(false)}
            >
              <View
                className="absolute top-24 left-5 right-5 bg-paper border border-border rounded-2xl shadow-lg"
                style={{ elevation: 8 }}
              >
                <Text className="text-base font-playfair-md text-ink px-4 pt-4 pb-2">
                  Notifications
                </Text>
                {notifications.map((n, i) => (
                  <View
                    key={n.id}
                    className={`px-4 py-3 ${i < notifications.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <Text className="text-sm font-playfair text-umber">
                      {n.text}
                    </Text>
                  </View>
                ))}
                <View className="h-2" />
              </View>
            </Pressable>
          </Modal>

          <TouchableOpacity onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={24} color="#C0392B" />
          </TouchableOpacity>
        </View>
        <View className="flex  justify-center items-center my-4 ">
          <TouchableOpacity onPress={pickAndUploadImage}>
            <Image
              key={localImage || user?.imageUrl}
              source={{ uri: localImage || user?.imageUrl }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
              contentFit="cover"
              cachePolicy="none" // cache'i devre dışı bırakır
            />
            {/* üstüne küçük kamera ikonu */}
            <View className="absolute bottom-0 right-0 bg-accent rounded-full p-1">
              <Ionicons name="camera-outline" size={14} color="#FAF7F2" />
            </View>
          </TouchableOpacity>
          <View className="flex-row items-center gap-2 my-3">
            <Text className="text-3xl font-playfair-bold">
              {user?.username}
            </Text>
            <TouchableOpacity onPress={() => setEditingUsername(true)}>
              <Ionicons name="pencil-outline" size={16} color="#8B7355" />
            </TouchableOpacity>
          </View>
          <Text className="text-md font-playfair">
            Dreamer of dreams, reader of books.
          </Text>
        </View>

        <View className="flex flex-row justify-between border-b border-[#D8D0BC] pb-6">
          <View className="items-center">
            <Text className="text-2xl  font-playfair-bold">321</Text>
            <Text className="font-playfair">Quotes</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl  font-playfair-bold">24</Text>
            <Text className="font-playfair">Books</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl  font-playfair-bold">50</Text>
            <Text className="font-playfair">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl  font-playfair-bold">125</Text>
            <Text className="font-playfair">Followings</Text>
          </View>
        </View>

        <View>
          <Text className="text-2xl font-medium font-playfair mt-5 mb-5">
            Top Authors
          </Text>

          <FlatList
            data={AUTHOR_DATA}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AuthorCard
                type="profile"
                name={item.name}
                avatar={item.avatar}
              />
            )}
          />
        </View>

        <View>
          <Text className="text-2xl font-medium font-playfair mt-5 mb-5">
            Favorite Themes
          </Text>

          <View className="flex-row flex-wrap gap-3">
            {["Thriller", "Romance", "Sci-Fi", "Fantasy", "Non-Fiction"].map(
              (item) => (
                <Badge key={item} label={item} />
              ),
            )}
          </View>
        </View>
      </View>
      <Modal
        visible={editingUsername}
        transparent
        animationType="fade"
        onRequestClose={() => setEditingUsername(false)}
      >
        <Pressable
          className="flex-1 bg-black/30 justify-center px-6"
          onPress={() => setEditingUsername(false)}
        >
          <View className="bg-paper rounded-2xl p-5 border border-border">
            <Text className="text-lg font-playfair-md text-ink mb-3">
              Edit Username
            </Text>
            <TextInput
              value={newUsername}
              onChangeText={setNewUsername}
              className="border border-border rounded-xl px-4 py-3 text-ink font-playfair"
              autoFocus
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={updateUsername}
              className="mt-4 bg-ink rounded-xl py-3 items-center"
            >
              <Text className="text-accentFg font-playfair-md">Save</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default Profile;
