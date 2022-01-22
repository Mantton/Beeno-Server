import { Router } from "express";
import * as Controller from "../controllers/company";

export const companyRouter = Router();

// Create Company
companyRouter.post("/new", Controller.handleCreateCompany);

// Edit Company
// Delete Company

// Get Companies
companyRouter.get("/", Controller.handleGetCompanyRecords);
