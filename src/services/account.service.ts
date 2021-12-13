import { Account } from ".prisma/client";
import database from "../helpers/prisma";

export const createAccount = async (handle: string): Promise<Account> => {
  return await database.account.create({
    data: {
      handle,
    },
  });
};
