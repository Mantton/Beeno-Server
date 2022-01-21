import { Router } from "express";
import * as Controller from "../controllers/auth";
import { requiresAuthentication } from "../validations";
import { validateLoginRequest } from "../validations/auth";
export const authRouter = Router();

authRouter.post("/login", validateLoginRequest, Controller.handleLogin);

authRouter.get(
  "/me",
  requiresAuthentication,
  Controller.handleGetAuthenticatedUser
);

authRouter.post("/flow/exists", Controller.handleAccountLookUp);
authRouter.post("/flow/handle", Controller.handleHandleLookUp);
// Email Verification
// Phone Verification
// Logout
