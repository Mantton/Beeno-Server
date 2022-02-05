import { Router } from "express";
import { privileges } from "../config/constants";
import * as Controller from "../controllers/company";
import { requiresPrivilege } from "../validations";

export const companyRouter = Router();

// Create Company
companyRouter.post(
  "/new",
  [requiresPrivilege(privileges.CRUD_CAG)],
  Controller.handleCreateCompany
);

// Edit Company
// Delete Company

// Get Companies
companyRouter.get("/", Controller.handleGetCompanyRecords);

companyRouter.get("/:id", Controller.handleGetCompany);
