import { Account } from "@prisma/client";

declare global {
  declare namespace Express {
    interface Request {
      account?: Account;
    }
  }
}
