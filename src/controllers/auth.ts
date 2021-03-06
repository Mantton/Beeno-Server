import { NextFunction, Request, Response } from "express";
import {
  doesAccountExist,
  fetchAccountRecord,
  isHandleInUse,
} from "../database";
import { loginUser } from "../database/authentication";
import { logger } from "../utils";

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { handle, email, password } = req.body;

  try {
    const account = await loginUser(handle, email, password);

    if (!account) {
      res.status(403).send({ msg: "unauthorized" });
      return;
    }

    req.session.account = account;

    req.session.save((err) => {
      if (err) {
        next(err);
        return;
      }

      res.send({
        msg: `operation successful, welcome ${account.handle}`,
        success: true,
        data: account,
      });
    });
  } catch (err) {
    next(err);
  }
};

export const handleGetAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.session.account) {
      const account = await fetchAccountRecord(req.session.account.id);

      if (!account) throw new Error("ERR_VALID_SESSION_NO_ACCOUNT");

      const out = {
        id: account.id,
        handle: account.handle,
        privileges: account.privileges.map((x) => x.privilege),
      };
      res.send(out);
    } else {
      res.status(401).send({ msg: "unauthorized" });
    }
  } catch (err) {
    next(err);
  }
};

export const handleAccountLookUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Data is validated before this point
  const entry = req.body.text;
  try {
    const foundType = await doesAccountExist(entry);

    if (!foundType) {
      res.status(404).send({ msg: "account not found" });
      return;
    }

    res.send({ success: true, type: foundType });
  } catch (err) {
    next(err);
  }
};

export const handleHandleLookUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const handle = req.body.handle;
  // * Note, the beeno frontend removes the '@' character if added by user
  try {
    const inUse = await isHandleInUse(handle);
    res.send({ inUse });
  } catch (err) {
    next(err);
  }
};

export const handleLogout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      logger.error(err.message);
    }

    res.send({ msg: "Beeno" });
  });
};
