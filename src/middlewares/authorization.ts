import { NextFunction, Request, Response } from "express";
import { authenticateBeenoUser, hasNecessaryPrivileges } from "../services";

export const requiresAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwt = req.headers["beeno-access-token"];

  if (!jwt || typeof jwt !== "string") {
    res.status(401).send({ msg: "unauthorized" });
    return;
  }
  try {
    const account = await authenticateBeenoUser(jwt);
    req.account = account;
    next();
  } catch {
    res.status(403).send({ msg: "unauthorized" });
  }
};

export const hasPrivilege = (privilege: number) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    if (!req.account) {
      res.status(401).send({ msg: "unauthorized" });
      return;
    }
    if (await hasNecessaryPrivileges(privilege, req.account.id)) {
      next();
      return;
    }

    res.status(401).send({ msg: "unauthorized" });
  };
};
