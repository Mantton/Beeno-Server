import { database } from "../helpers";
import { hashPassword } from "../utils/auth";
export const createCredentialRecord = async (
  accountId: number,
  password: string
) => {
  const hashedResult = await hashPassword(password);

  await database.credential.create({
    data: {
      hashedValue: hashedResult,
      accountId,
    },
  });

  // No need to return created record
};
