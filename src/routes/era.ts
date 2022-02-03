import { Router } from "express";
import { privileges } from "../config/constants";
import { requiresPrivilege } from "../validations";
import { validateEraForGroupRequest } from "../validations/core";
import * as Controller from "../controllers/era";

export const eraRouter = Router();

eraRouter.get("/:id", Controller.handleGetEra);
eraRouter.get("/group/:id", Controller.handleGetEraForGroup);

eraRouter.post(
  "/group/new",
  [requiresPrivilege(privileges.CRUD_ECS), validateEraForGroupRequest()],
  Controller.handleCreateEraForGroup
);
