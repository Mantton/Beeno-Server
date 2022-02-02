export const APP_NAME = "Beeno";

export enum privileges {
  SUPERUSER = 0,
  CRUD_CAG = 1, // CAG: Company, Artist, Groups
  CRUD_ES = 2, // ES: Eras , Sets (Card Sets)
  CRUD_CARDS = 3,
  UPLOAD_IMAGE = 4,
}
