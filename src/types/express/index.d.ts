import { Account } from "@prisma/client";

declare global {
  declare namespace Express {
    export interface Request {
      account?: Account;
    }
  }
}
