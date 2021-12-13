import "dotenv/config";
import logger from "./logger";

export const ENVIRONMENT = process.env.NODE_ENV ?? "development";
export const isProductionEnvironment = ENVIRONMENT === "production";

export const DB_URI = process.env["DB_URI"];
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
