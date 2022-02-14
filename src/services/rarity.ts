import { rarities } from "../config/constants";
import { probability } from "../utils/probability";

export async function assignRarity() {
  if (probability(1)) {
    // 2%
    return rarities.LEGENDARY;
  } else if (probability(5)) {
    // 5%
    return rarities.ULTRA_RARE;
  } else if (probability(10)) {
    // 12%
    return rarities.RARE;
  } else if (probability(20)) {
    // 20%
    return rarities.UNCOMMON;
  }

  return rarities.COMMON;
}
