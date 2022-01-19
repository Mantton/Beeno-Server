import express from "express";
import helmet from "helmet";
import multer from "multer";
import { errorHandler } from "./helpers";
import { initializeFirebaseAdmin } from "./helpers/firebase";
import { companyRouter } from "./routes";
import { imageRouter } from "./routes/image";
import { createSuperUser } from "./services/";
import { logger } from "./utils";

const app = express();
initializeFirebaseAdmin();

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
// Middleware
app.use(multerMid.single("file"));
app.use(helmet());
app.use(express.json());

// SuperUser
createSuperUser().catch((err) => {
  logger.error("Failed to Create SuperUser " + err.message);
  process.exit(1);
});
// Routes
app.use("/company", companyRouter);
app.use("/image", imageRouter);

// Error Handler

app.use(errorHandler);
export default app;
