import { Router } from "express";
import * as Controller from "../controllers/auth";
import { requiresAuthentication } from "../validations";
import {
  validateAccountExistsFlow,
  validateHandleFlow,
  validateLoginRequest,
} from "../validations/auth";

export const authRouter = Router();
authRouter.post("/login", validateLoginRequest(), Controller.handleLogin);
authRouter.get("/logout", requiresAuthentication, Controller.handleLogout);
authRouter.get(
  "/me",
  requiresAuthentication,
  Controller.handleGetAuthenticatedUser
);

authRouter.post(
  "/flow/exists",
  [validateAccountExistsFlow()],
  Controller.handleAccountLookUp
);
authRouter.post(
  "/flow/handle",
  [validateHandleFlow()],
  Controller.handleHandleLookUp
);

// TODO
// Email Verification
// Phone Verification
