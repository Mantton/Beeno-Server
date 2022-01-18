import express from "express";
import helmet from "helmet";
import { initializeFirebaseAdmin } from "./helpers/firebase";
import { companyRouter } from "./routes";
import { createSuperUser } from "./services/";
import logger from "./utils/logger";

const app = express();
initializeFirebaseAdmin();

// Middleware
app.use(helmet());
app.use(express.json());

// SuperUser
createSuperUser().catch((err) => {
  logger.error("Failed to Create SuperUser " + err.message);
  process.exit(1);
});
// Routes
app.use("/company", companyRouter);
export default app;
