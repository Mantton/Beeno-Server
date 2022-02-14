export const APP_NAME = "Beeno";
export const DEFAULT_IMAGE = "/icon.png";

export const BAD_REQUEST = { msg: "bad request" };
export enum privileges {
  SUPERUSER,
  CRUD_CAG, // CAG: Company, Artist, Groups
  CRUD_ECS, // ES: Eras ,Collection, Sets (Card Sets)
  CRUD_CARDS,
  UPLOAD_IMAGE,
}

export enum rarities {
  COMMON,
  UNCOMMON,
  RARE,
  ULTRA_RARE,
  LEGENDARY,
}

export const cleanRarities = Object.keys(rarities)
  .filter((key: any) => isNaN(Number(rarities[key])))
  .map((x) => parseInt(x));
