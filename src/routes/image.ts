import { Router } from "express";
import { privileges } from "../config/constants";
import * as Controller from "../controllers/image";
import { requiresAuthentication, requiresPrivilege } from "../validations";
export const imageRouter = Router();

// Upload Image
imageRouter.post(
  "/upload",
  [requiresAuthentication, requiresPrivilege(privileges.UPLOAD_IMAGE)],
  Controller.handleUploadImage
);
