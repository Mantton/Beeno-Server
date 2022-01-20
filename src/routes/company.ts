import { Router } from "express";
import * as Controller from "../controllers/company";

export const companyRouter = Router();

companyRouter.post("/", Controller.handleCreateCompany);

// Create Company
// Edit Company
// Delete Company
