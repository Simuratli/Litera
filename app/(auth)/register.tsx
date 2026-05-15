import { useClerk, useSignUp } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  const { signUp } = useSignUp();
  const { setActive } = useClerk();
  const router = useRouter();

  const handleSignUp = async () => {
    if (!signUp) return;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await signUp.create({ emailAddress: email, password, username });
      await signUp.verifications.sendEmailCode();
      setPendingVerification(true);
    } catch (err: any) {
      setError(err.errors?.[0]?.message ?? "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!signUp) return;
    setLoading(true);
    setError("");
    try {
      await signUp.verifications.verifyEmailCode({ code });
      if (signUp.status === "complete") {
        await setActive({ session: signUp.createdSessionId });
        router.replace("/(tabs)/home");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message ?? "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
      >
        <SafeAreaView className="flex-1 bg-paper">
          <View className="flex-1 px-7 justify-center">
            <Text className="text-4xl font-playfair-bold text-ink text-center mb-2">
              Check your email
            </Text>
            <Text className="text-base font-playfair text-umber text-center mb-10">
              Enter the verification code{"\n"}sent to {email}
            </Text>
            <Text className="text-sm font-playfair-md text-ink mb-1.5">
              Verification Code
            </Text>
            <TextInput
              className="w-full border border-border rounded-xl px-4 py-3.5 text-base font-playfair text-ink bg-surface3 mb-4 text-center tracking-widest"
              placeholder="000000"
              placeholderTextColor="#A89880"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
            />
            {error ? (
              <Text className="text-sm font-playfair text-error text-center mb-4">
                {error}
              </Text>
            ) : null}
            <TouchableOpacity
              className="w-full bg-accent rounded-xl py-4 items-center"
              onPress={handleVerify}
              disabled={loading}
            >
              <Text className="text-base font-playfair-bold text-accentFg">
                {loading ? "Verifying..." : "Verify"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }

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
              Create Account
            </Text>
            <Text className="text-base font-playfair text-umber text-center mb-10">
              Join us! Fill in your details{"\n"}to get started.
            </Text>

            {/* Username */}
            <Text className="text-sm font-playfair-md text-ink mb-1.5">
              Username
            </Text>
            <TextInput
              className="w-full border border-border rounded-xl px-4 py-3.5 text-base font-playfair text-ink bg-surface3 mb-4"
              placeholder="johndoe"
              placeholderTextColor="#A89880"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

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
            <View className="w-full border border-border rounded-xl px-4 py-3.5 bg-surface3 flex-row items-center mb-4">
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

            {/* Confirm Password */}
            <Text className="text-sm font-playfair-md text-ink mb-1.5">
              Confirm Password
            </Text>
            <View className="w-full border border-border rounded-xl px-4 py-3.5 bg-surface3 flex-row items-center mb-8">
              <TextInput
                className="flex-1 text-base font-playfair text-ink"
                placeholder="••••••••"
                placeholderTextColor="#A89880"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#A89880"
                />
              </TouchableOpacity>
            </View>

            {/* Error */}
            {error ? (
              <Text className="text-sm font-playfair text-error text-center mb-4 -mt-4">
                {error}
              </Text>
            ) : null}

            {/* Sign Up Button */}
            <TouchableOpacity
              className="w-full bg-accent rounded-xl py-4 items-center mb-6"
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text className="text-base font-playfair-bold text-accentFg">
                {loading ? "Creating account..." : "Sign Up"}
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
              <TouchableOpacity className="flex-1 border border-border rounded-xl py-3.5 items-center bg-surface3 flex-row justify-center">
                <Ionicons name="logo-google" size={22} color="#2C1810" />
                <Text className="text-base font-playfair text-ink ml-2">
                  Continue with Google
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Link */}
            <View className="flex-row justify-center">
              <Text className="text-sm font-playfair text-ink">
                Already have an account?{" "}
              </Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text className="text-sm font-playfair text-accent">
                    Sign in
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
