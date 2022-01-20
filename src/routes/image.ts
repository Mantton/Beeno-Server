import { Router } from "express";
import { privileges } from "../config/constants";
import * as Controller from "../controllers/image";
import { requiresAuthentication, hasPrivilege } from "../validations";
export const imageRouter = Router();

// Upload Image
imageRouter.post(
  "/upload",
  [requiresAuthentication, hasPrivilege(privileges.UPLOAD_IMAGE)],
  Controller.handleUploadImage
);
