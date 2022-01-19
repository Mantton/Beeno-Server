import { Router } from "express";
import * as Controller from "../controllers/auth";
import { requiresAuthentication } from "../validations";
export const authRouter = Router();

authRouter.post("/login", Controller.handleLogin);

authRouter.get("/me", requiresAuthentication, Controller.handlePingPong);
