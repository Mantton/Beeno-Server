import { Router } from "express";
import { privileges } from "../config/constants";
import { requiresPrivilege } from "../validations";
import * as Controller from "../controllers/card";
import { validateCardCreationRequest } from "../validations/core";

export const CardRouter = Router();

CardRouter.post(
  "/new",
  [requiresPrivilege(privileges.CRUD_ECS), validateCardCreationRequest()],
  Controller.handleCreateCard
);
// setRouter.get("/delete/:id", Controller.handleDeleteCardSet);

// setRouter.get(
//   "/:id",
//   [requiresPrivilege(privileges.CRUD_ECS)],
//   Controller.handleGetCardSet
// );
