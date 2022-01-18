import { auth } from "firebase-admin";
/**
 * Creates a new firebase user
 * @param email Email of the user
 * @param password The password of the user
 * @returns `UserRecord` object
 */
export const createFirebaseUser = async (email: string, password: string) => {
  // Reference : https://firebase.google.com/docs/auth/admin/manage-users#create_a_user
  const record = await auth().createUser({
    email,
    emailVerified: false,
    password,
    disabled: false,
  });
  return record;
};

/**
 *  Returns the UID of the provided jwt
 * @param jwt The incoming firebase jwt
 * @returns the uid of the authenticated user
 */
export const authenticateFirebaseUser = async (jwt: string) => {
  const result = await auth().verifyIdToken(jwt, true);
  return result.uid;
};
