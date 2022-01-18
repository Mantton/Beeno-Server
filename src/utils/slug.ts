import slugify from "slugify";

/**
 * generates a slug for a given string
 * @param text the text to sluggify
 * @returns slug of string
 */
export const slug = (text: string) => {
  return slugify(text, { lower: true });
};
