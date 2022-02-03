import { Router } from "express";
import { privileges } from "../config/constants";
import * as Controller from "../controllers/group";
import { requiresPrivilege } from "../validations";
import { validateGroupRequest } from "../validations/core";
export const groupRouter = Router();

groupRouter.post(
  "/new",
  [requiresPrivilege(privileges.CRUD_CAG), validateGroupRequest()],
  Controller.handleCreateGroup
);

groupRouter.get("/:id", Controller.handleGetGroup);
groupRouter.get("/", Controller.handleGetGroups);
