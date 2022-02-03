import { Router } from "express";
import { privileges } from "../config/constants";
import * as Controller from "../controllers/artist";
import { requiresPrivilege } from "../validations";
import { validateArtistRequest } from "../validations/core";
export const artistRouter = Router();

artistRouter.get("/:id", Controller.handleGetArtist);

artistRouter.post(
  "/new",
  [requiresPrivilege(privileges.CRUD_CAG), validateArtistRequest()],
  Controller.handleCreateArtist
);
