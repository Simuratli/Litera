import "@/global.css";
import { ClerkProvider } from "@clerk/expo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useState } from "react";
import SplashScreen from "../components/splash-screen";

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

  const [fontsLoaded] = useFonts({
    "PlayfairDisplay-Regular": require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
    "PlayfairDisplay-Medium": require("../assets/fonts/PlayfairDisplay-Medium.ttf"),
    "PlayfairDisplay-SemiBold": require("../assets/fonts/PlayfairDisplay-SemiBold.ttf"),
    "PlayfairDisplay-Bold": require("../assets/fonts/PlayfairDisplay-Bold.ttf"),
    "PlayfairDisplay-ExtraBold": require("../assets/fonts/PlayfairDisplay-ExtraBold.ttf"),
    "PlayfairDisplay-Black": require("../assets/fonts/PlayfairDisplay-Black.ttf"),
    "PlayfairDisplay-Italic": require("../assets/fonts/PlayfairDisplay-Italic.ttf"),
    "PlayfairDisplay-MediumItalic": require("../assets/fonts/PlayfairDisplay-MediumItalic.ttf"),
    "PlayfairDisplay-SemiBoldItalic": require("../assets/fonts/PlayfairDisplay-SemiBoldItalic.ttf"),
    "PlayfairDisplay-BoldItalic": require("../assets/fonts/PlayfairDisplay-BoldItalic.ttf"),
    "PlayfairDisplay-ExtraBoldItalic": require("../assets/fonts/PlayfairDisplay-ExtraBoldItalic.ttf"),
    "PlayfairDisplay-BlackItalic": require("../assets/fonts/PlayfairDisplay-BlackItalic.ttf"),
  });

  if (!ready) {
    return <SplashScreen onFinish={() => setReady(true)} />;
  }

  if (!fontsLoaded) return null;

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Stack screenOptions={{ headerShown: false }} />
    </ClerkProvider>
  );
}
