import { DEFAULT_IMAGE } from "../config/constants";

export const imageUrl = (image: { base: string } | null) => {
  return image?.base ?? DEFAULT_IMAGE;
};
