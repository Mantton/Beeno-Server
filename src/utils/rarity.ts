/**
 * Generates a number between the minimum and maximum parameters
 * @param min minimum number in range
 * @param max maximum number in range
 * @returns random number between min and max
 */
export const randomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

/**
 *
 * @param name name of the rarity
 * @returns the number of cards of this rarity
 */
export const getIterations = (name: string): number => {
  switch (name.toLowerCase()) {
    case "legendary":
      return 10;
    case "ultra rare":
      return 20;
    case "rare":
      return randomNumber(70, 100);
    case "uncommon":
      return randomNumber(350, 500);
    case "common":
    default:
      return randomNumber(650, 1150);
  }
};

export const sortRarity = (a: number, b: number) => {
  if (a > b) return -1;
  if (a === b) return 0;
  if (a < b) return 1;
  return 0;
};
