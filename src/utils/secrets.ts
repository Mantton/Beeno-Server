import "dotenv/config";
import { logger } from ".";
export const ENVIRONMENT = process.env.NODE_ENV ?? "development";
export const isProductionEnvironment = ENVIRONMENT === "production";

// Database
export const DB_URI = process.env["DB_URI"];

// Beeno SuperUser
export const ADMIN_EMAIL = process.env["ADMIN_EMAIL"];
export const ADMIN_HANDLE = process.env["ADMIN_HANDLE"];
export const ADMIN_PW = process.env["ADMIN_PW"];

// GCS
export const GCS_PROJECT_ID = process.env["GCS_PROJECT_ID"];
export const GCS_CLIENT_EMAIL = process.env["GCS_CLIENT_EMAIL"];
export const GCS_PRIVATE_KEY = process.env["GCS_PRIVATE_KEY"];
export const BUCKET_NAME = process.env["GCS_BUCKET"];
//Misc
export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const REDIS_HOST = process.env["REDIS_HOST"];
export const PORT = process.env["PORT"] ?? 5000;

if (!DB_URI) {
  logger.error("No DB Connection String. Set DB_URI environment variable");
  process.exit(1);
}

if (!SESSION_SECRET) {
  logger.error("No Session Secret. Set SESSION_SECRET environment variable");
  process.exit(1);
}

if (!REDIS_HOST) {
  logger.error("No Redis Host Specified. Set REDIS_HOST environment variable");
  process.exit(1);
}

if (!GCS_PROJECT_ID || !GCS_CLIENT_EMAIL || !GCS_PRIVATE_KEY || !BUCKET_NAME) {
  logger.error(
    "Missing GCS Config. Set GCS_PROJECT_ID & GCS_CLIENT_EMAIL & GCS_PRIVATE_KEY & BUCKET_NAME"
  );
  process.exit(1);
}
if (!ADMIN_EMAIL || !ADMIN_HANDLE || !ADMIN_PW) {
  logger.error(
    "SuperUser Credentials not configured. Be Sure to Set ADMIN_EMAIL & ADMIN_HANDLE & ADMIN_PW"
  );
  process.exit(1);
}
