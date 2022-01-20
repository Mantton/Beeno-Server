import { Router } from "express";
import * as Controller from "../controllers/auth";
import { requiresAuthentication } from "../validations";
import { validateLoginRequest } from "../validations/auth";
export const authRouter = Router();

authRouter.post("/login", validateLoginRequest, Controller.handleLogin);

authRouter.get("/me", requiresAuthentication, Controller.handlePingPong);

// Email Verification
// Phone Verification
// Logout
