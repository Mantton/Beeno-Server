import { Router } from "express";
import * as Controller from "../controllers/company.controller";

export const companyRouter = Router();

companyRouter.post("/", Controller.postCompany);
