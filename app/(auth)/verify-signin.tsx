import { useSignIn } from "@clerk/expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifySignIn() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useSignIn();
  const router = useRouter();

  const handleVerify = async () => {
    if (!signIn) return;
    setLoading(true);
    setError("");
    try {
      const { error: verifyError } = await signIn.mfa.verifyEmailCode({ code });
      if (verifyError) {
        setError(verifyError.message ?? "Verification failed");
        return;
      }
      if (signIn.status === "complete") {
        await signIn.finalize();
        router.replace("/(tabs)/home");
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message ?? "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
    >
      <SafeAreaView className="flex-1 bg-paper">
        <View className="px-7 py-10 flex-1 justify-center">
          <Text className="text-4xl font-playfair-bold text-ink text-center mb-2">
            Check Your Email
          </Text>
          <Text className="text-base font-playfair text-umber text-center mb-10">
            We sent a verification code to your email address.
          </Text>

          <Text className="text-sm font-playfair-md text-ink mb-1.5">
            Verification Code
          </Text>
          <TextInput
            className="w-full border border-border rounded-xl px-4 py-3.5 text-base font-playfair text-ink bg-surface3 mb-6"
            placeholder="000000"
            placeholderTextColor="#A89880"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
          />

          {error ? (
            <Text className="text-sm font-playfair text-error text-center mb-4 -mt-3">
              {error}
            </Text>
          ) : null}

          <TouchableOpacity
            className="w-full bg-accent rounded-xl py-4 items-center disabled:opacity-50"
            onPress={handleVerify}
            disabled={loading || code.length < 6}
          >
            <Text className="text-base font-playfair-bold text-accentFg">
              {loading ? "Verifying..." : "Verify"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-5 items-center"
            onPress={() => router.back()}
          >
            <Text className="text-sm font-playfair text-umber">
              Back to Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
