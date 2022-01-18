import { privileges } from "../config/constants";
import { database } from "../helpers/prisma";
import { ADMIN_EMAIL, ADMIN_HANDLE, ADMIN_PW } from "../utils";
import logger from "../utils/logger";
import { authenticateFirebaseUser, createFirebaseUser } from "./user.service";

// Handles Direct Adding of Data
export const insertAccountRecord = async (
  firebaseId: string,
  handle: string
) => {
  return await database.account.create({
    data: {
      firebaseId,
      handle,
    },
  });
};

/**
 * Creates a New Beeno User
 * @param email The Users Email
 * @param password The users password
 * @param handle the handle of the user
 * @returns The `Account` record created
 */
export const createBeenoUser = async (
  email: string,
  password: string,
  handle: string
) => {
  const record = await createFirebaseUser(email, password);
  const account = await insertAccountRecord(record.uid, handle);
  return account;
};

/**
 * Creates a SuperUser with Environment Credentials
 * @returns `void`
 */
export const createSuperUser = async () => {
  const count = await database.account.count();

  if (count != 0) return;

  // Create User
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  let account = await createBeenoUser(ADMIN_EMAIL!, ADMIN_PW!, ADMIN_HANDLE!);

  // Verify Account
  account = await database.account.update({
    where: { id: account.id },
    data: {
      verified: true,
    },
  });

  // Give Superuser Privilege
  await database.privilege.create({
    data: {
      accountId: account.id,
      privilege: privileges.SUPERUSER,
    },
  });
  logger.info(`SuperUser Created -- @${account.handle} -- ${account.id}`);
};

export const authenticateBeenoUser = async (jwt: string) => {
  const uid = await authenticateFirebaseUser(jwt);
  const account = await database.account.findUnique({
    where: {
      firebaseId: uid,
    },
  });

  if (!account) throw "user not found";
  return account;
};
