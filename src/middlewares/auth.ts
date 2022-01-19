import { NextFunction, Request, Response } from "express";
import { hasNecessaryPrivileges } from "../services";

export const validateSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.sessionID) {
    res.status(401).send({ msg: "unauthorized" });
    return;
  }
  next();
};

export const requiresAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.sessionID || !req.session.account) {
    res.status(401).send({ msg: "unauthorized" });
    return;
  }
  next();
};

export const hasPrivilege = (privilege: number) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    if (!req.session.account) {
      res.status(401).send({ msg: "unauthorized" });
      return;
    }
    if (await hasNecessaryPrivileges(privilege, req.session.account.id)) {
      next();
      return;
    }

    res.status(401).send({ msg: "unauthorized" });
  };
};
