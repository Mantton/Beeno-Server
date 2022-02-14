import { Router } from "express";
import { privileges } from "../config/constants";
import * as Controller from "../controllers/collection";
import { requiresPrivilege } from "../validations";
import { validateCollectionRequest } from "../validations/core";

export const collectionRouter = Router();

collectionRouter.post(
  "/new",
  [requiresPrivilege(privileges.CRUD_ECS), validateCollectionRequest()],
  Controller.handleCreateCollection
);

collectionRouter.get(
  "/delete/:id",
  [requiresPrivilege(privileges.CRUD_ECS)],
  Controller.handleDeleteCollection
);
