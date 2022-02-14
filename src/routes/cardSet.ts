import { Router } from "express";
import { privileges } from "../config/constants";
import { requiresPrivilege } from "../validations";
import * as Controller from "../controllers/cardSet";
import { validateCardSetRequest } from "../validations/core";

export const setRouter = Router();

setRouter.post(
  "/new",
  [requiresPrivilege(privileges.CRUD_ECS), validateCardSetRequest()],
  Controller.handleCreateCardSet
);
setRouter.get("/delete/:id", Controller.handleDeleteCardSet);

setRouter.get(
  "/:id",
  [requiresPrivilege(privileges.CRUD_ECS)],
  Controller.handleGetCardSet
);
