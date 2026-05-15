import { useEffect, useRef } from "react";
import {
    Animated,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface Props {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: Props) {
  const translateY = useRef(new Animated.Value(40)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1200),
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <ImageBackground
        source={require("../assets/images/splash.png")}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />

      <Animated.View
        style={[
          styles.logoWrapper,
          { opacity: logoOpacity, transform: [{ translateY }] },
        ]}
      >
        {/* L harfi kutusu */}
        <View className="w-[90px] h-[90px] border-[1.5px] border-[#8B7355] items-center justify-center mb-2">
          <Text className="text-[52px] text-[#3D2B1F] font-playfair">L</Text>
        </View>

        {/* LITERA yazısı */}
        <Text className="text-[22px] tracking-[10px] text-[#3D2B1F] font-playfair">
          LITERA
        </Text>

        {/* Alt slogan */}
        <Text className="text-xs tracking-[1px] text-[#8B7355] mt-0.5 font-playfair">
          Books are lighthouses
        </Text>
        <Text className="text-xs tracking-[1px] text-[#8B7355] font-playfair">
          erected in the great sea of time.
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  logoWrapper: {
    alignItems: "center",
    gap: 12,
  },
});
