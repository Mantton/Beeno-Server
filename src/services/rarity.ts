import { rarities } from "../config/constants";
import { probability } from "../utils/probability";

export async function assignRarity() {
  if (probability(3)) {
    // 3%
    return rarities.LEGENDARY;
  } else if (probability(7)) {
    // 7%
    return rarities.ULTRA_RARE;
  } else if (probability(15)) {
    // 15%
    return rarities.RARE;
  } else if (probability(25)) {
    // 25%
    return rarities.UNCOMMON;
  }

  return rarities.COMMON;
}
