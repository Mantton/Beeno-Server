import { report } from "process";
import { privileges } from "../config/constants";
import { database } from "../helpers/prisma";
import { ADMIN_EMAIL, ADMIN_HANDLE, ADMIN_PW } from "../utils";
import { logger } from "../utils";
import { createCredentialRecord } from "./credential";

export const insertAccountRecord = async (handle: string, email: string) => {
  return await database.account.create({
    data: {
      handle,
      email,
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
  return await database.$transaction(async () => {
    // Create Account Record
    const account = await insertAccountRecord(handle, email);

    // Create Credential Record
    await createCredentialRecord(account.id, password);
    return account;
  });
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
      emailVerified: true,
      phoneVerified: true,
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

/**
 * Checks if an account exists in the db using an entry string
 * @param entry The email or handle of the target account
 * @returns Boolean indicating whether the account exists or not
 */
export const doesAccountExist = async (entry: string) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (entry.match(emailRegex)) {
    // Handle Email Flow

    const accounts = await database.account.count({
      where: {
        email: entry,
      },
    });

    if (accounts == 0) return false;
  } else {
    const accounts = await database.account.count({
      where: {
        handle: entry,
      },
    });

    if (accounts == 0) return false;
  }

  return true;
};
