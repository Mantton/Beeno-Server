import { NextFunction, Request, Response } from "express";
import { loginUser } from "../services/authentication";

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

export const handlePingPong = (req: Request, res: Response) => {
  if (req.session.account) {
    res.send({ msg: "Pong", handle: req.session.account.handle });
  } else {
    res.status(401).send({ msg: "unauthorized" });
  }
};

const handleAccountLookUp = async () => {
  //
};
