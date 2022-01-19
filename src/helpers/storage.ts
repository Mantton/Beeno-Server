import { Storage } from "@google-cloud/storage";
import { GCS_CLIENT_EMAIL, GCS_PRIVATE_KEY, GCS_PROJECT_ID } from "../utils";

export const storage = new Storage({
  projectId: GCS_PROJECT_ID,
  credentials: {
    private_key: GCS_PRIVATE_KEY,
    client_email: GCS_CLIENT_EMAIL,
  },
});
