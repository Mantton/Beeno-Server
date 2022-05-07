import { Router } from "express";
import { privileges } from "../config/constants";
import { requiresPrivilege } from "../validations";
import { validateEraForGroupRequest } from "../validations/core";
import * as Controller from "../controllers/era";

export const EraRouter = Router();

// eraRouter.get(
//   "/delete/:id",
//   requiresPrivilege(privileges.CRUD_ECS),
//   Controller.handleDeleteEra
// );
EraRouter.get("/:id", Controller.handleGetEra);
// eraRouter.get("/group/:id", Controller.handleGetEraForGroup);

EraRouter.post(
  "/group/new",
  [requiresPrivilege(privileges.CRUD_ECS), validateEraForGroupRequest()],
  Controller.handleCreateEraForGroup
);
