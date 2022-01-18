import { mockDatabase } from "../singleton";
import { createAccount } from "../../src/db";
test("should create new account ", async () => {
  const date = new Date();
  const account = {
    handle: "dog",
    id: "91eaab5b-232d-4333-b748-299433b7fa1b",
    dateCreated: date,
    isVerified: false,
    isAdmin: false,
  };

  mockDatabase.account.create.mockResolvedValue(account);

  await expect(createAccount("dog")).resolves.toEqual({
    id: "91eaab5b-232d-4333-b748-299433b7fa1b",
    handle: "dog",
    dateCreated: date,
    isVerified: false,
    isAdmin: false,
  });
});