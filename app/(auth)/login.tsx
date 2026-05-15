import { useClerk, useSignIn, useSSO } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { Link, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useSignIn();
  const { setActive } = useClerk();
  const { startSSOFlow } = useSSO();
  const router = useRouter();
  const handleSignIn = async () => {
    if (!signIn) return;
    setLoading(true);
    setError("");
    try {
      const { error: createError } = await signIn.create({
        identifier: email,
        password,
      });
      if (createError) {
        setError(createError.message ?? "Sign in failed");
        return;
      }
      if (signIn.status === "complete") {
        await signIn.finalize();
        router.replace("/(tabs)/home");
      } else if (signIn.status === "needs_second_factor") {
        await signIn.mfa.sendEmailCode();
        router.push("/(auth)/verify-signin" as any);
      } else {
        setError(`Unexpected status: ${signIn.status}`);
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message ?? "Sign in failed");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive: setSSOActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: Linking.createURL("/"),
      });
      if (createdSessionId && setSSOActive) {
        await setSSOActive({ session: createdSessionId });
        router.replace("/(tabs)/home");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message ?? "Google sign in failed");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
    >
      <SafeAreaView className="flex-1 bg-paper">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="px-7 py-10">
            {/* Header */}
            <Text className="text-4xl font-playfair-bold text-ink text-center mb-2">
              Sign In
            </Text>
            <Text className="text-base font-playfair text-umber text-center mb-10">
              Welcome back! Please sign in{"\n"}to continue.
            </Text>

            {/* Email */}
            <Text className="text-sm font-playfair-md text-ink mb-1.5">
              Email
            </Text>
            <TextInput
              className="w-full border border-border rounded-xl px-4 py-3.5 text-base font-playfair text-ink bg-surface3 mb-4"
              placeholder="youremail@example.com"
              placeholderTextColor="#A89880"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            {/* Password */}
            <Text className="text-sm font-playfair-md text-ink mb-1.5">
              Password
            </Text>
            <View className="w-full border border-border rounded-xl px-4 py-3.5 bg-surface3 flex-row items-center mb-2">
              <TextInput
                className="flex-1 text-base font-playfair text-ink"
                placeholder="••••••••"
                placeholderTextColor="#A89880"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#A89880"
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="self-end mb-7">
              <Text className="text-sm font-playfair text-umber">
                Forgot password?
              </Text>
            </TouchableOpacity>

            {/* Error */}
            {error ? (
              <Text className="text-sm font-playfair text-error text-center mb-4 -mt-3">
                {error}
              </Text>
            ) : null}

            {/* Sign In Button */}
            <TouchableOpacity
              className="w-full bg-accent rounded-xl py-4 items-center mb-6 disabled:opacity-50"
              onPress={handleSignIn}
              disabled={loading}
            >
              <Text className="text-base font-playfair-bold text-accentFg">
                {loading ? "Signing in..." : "Sign In"}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center gap-3 mb-6">
              <View className="flex-1 h-px bg-border" />
              <Text className="text-sm font-playfair text-dust">
                or continue with
              </Text>
              <View className="flex-1 h-px bg-border" />
            </View>

            {/* Social Buttons */}
            <View className="flex-row gap-4 mb-8">
              <TouchableOpacity
                className="flex-1 border border-border rounded-xl py-3.5 items-center bg-surface3 flex-row justify-center"
                onPress={handleGoogleSignIn}
              >
                <Ionicons name="logo-google" size={22} color="#2C1810" />
                <Text className="text-base font-playfair text-ink ml-2">
                  Continue with Google
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center">
              <Text className="text-sm font-playfair text-ink">
                Don't have an account?{" "}
              </Text>
              <Link href="/(auth)/register" asChild>
                <TouchableOpacity>
                  <Text className="text-sm font-playfair text-accent">
                    Sign up
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
