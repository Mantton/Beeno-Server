import { database } from "../helpers";
import { verifyPassword } from "../utils/auth";

export const loginUser = async (
  handle: string | null,
  email: string | null,
  password: string
) => {
  // Username
  let accountId: number | null = null;
  if (handle) {
    const account = await database.account.findFirst({
      where: {
        handle,
      },
    });

    if (!account) return null;
    accountId = account.id;
  }

  if (email) {
    const account = await database.account.findFirst({
      where: {
        email,
      },
    });

    if (!account) return null;
    accountId = account.id;
  }

  if (!accountId) return null;

  const credentials = await database.credential.findFirst({
    where: {
      accountId,
    },
  });

  if (!credentials) return null;

  const passwordMatched = await verifyPassword(
    password,
    credentials.hashedValue
  );

  if (!passwordMatched) return null;

  const account = database.account.findFirst({
    where: {
      id: accountId,
    },
  });

  if (!account) throw new Error("ERR_UNEXPECTED_RESULT");

  return account;
};

export const logoutUser = () => {
  //
};
