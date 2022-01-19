import express from "express";
import helmet from "helmet";
import multer from "multer";
import { errorHandler } from "./helpers";
import { companyRouter } from "./routes";
import { imageRouter } from "./routes/image";
import { createSuperUser } from "./services/";
import { logger } from "./utils";
import connectRedis from "connect-redis";
import session from "express-session";
import redisClient from "./helpers/redis";
import { authRouter } from "./routes/auth";

const app = express();
redisClient.connect();
// Multer
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Session Setup
const RedisStore = connectRedis(session);
const maxAgeInMinutes = 30;
const sessionStore = session({
  store: new RedisStore({ client: redisClient }),
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  name: "beeno-session",
  cookie: {
    secure: process.env.NODE_ENV == "production",
    httpOnly: true,
    maxAge: 1000 * 60 * maxAgeInMinutes,
    sameSite: true,
  },
});
app.use(sessionStore);

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
app.use("/auth", authRouter);

// Error Handler

app.use(errorHandler);
export default app;
