export const APP_NAME = "Beeno";

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
