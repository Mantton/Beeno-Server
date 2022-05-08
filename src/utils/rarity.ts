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
export const getIterations = (id: number): number => {
  switch (id) {
    case 4:
      return 10;
    case 3:
      return 50;
    case 2:
      return 250;
    case 1:
      return 450;
    case 0:
    default:
      return 750;
  }
};

export const sortRarity = (a: number, b: number) => {
  if (a > b) return -1;
  if (a === b) return 0;
  if (a < b) return 1;
  return 0;
};
