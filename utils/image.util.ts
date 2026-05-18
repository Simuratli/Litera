import { ImageSourcePropType } from "react-native";

export const resolveSource = (
  cover: string | ImageSourcePropType | undefined,
): ImageSourcePropType | undefined => {
  if (!cover) return undefined;
  if (typeof cover === "string") return { uri: cover };
  return cover;
};
