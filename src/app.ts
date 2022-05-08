import express, { Request, Response } from "express";
import helmet from "helmet";
import multer from "multer";
import cors, { CorsOptions } from "cors";
import compression from "compression";
import connectRedis from "connect-redis";
import session from "express-session";
import { errorHandler } from "./helpers";
import { artistRouter, CardRouter, companyRouter } from "./routes";
import { imageRouter } from "./routes/image";
import { createSuperUser } from "./database";
import { logger } from "./utils";
import redisClient from "./helpers/redis";
import { authRouter } from "./routes/auth";
import { morganLogger } from "./utils/morgan";
import { groupRouter } from "./routes/group";
import { seedRarities } from "./database/rarity";
import { EraRouter } from "./routes/era";
import { setTradeStatusAndTypes } from "./database/trade";

const app = express();
// app.options("*", cors({origin: []}));
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
const maxAgeInMinutes = 240;
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
app.use(morganLogger);
app.use(compression());

// CORS
const whitelist = ["http://localhost:3000"];
const options: CorsOptions = {
  origin: whitelist,
  credentials: true,
};
app.use(cors(options));

// SuperUser
createSuperUser().catch((err) => {
  logger.error("Failed to Create SuperUser " + err.message);
  process.exit(1);
});

seedRarities();
setTradeStatusAndTypes();

// Routes
app.use("/company", companyRouter);
app.use("/image", imageRouter);
app.use("/auth", authRouter);
app.use("/group", groupRouter);
app.use("/artist", artistRouter);
app.use("/cards", CardRouter);
app.use("/eras", EraRouter);
// Error Handler
app.use(errorHandler);

app.use("*", (req: Request, res: Response) => {
  res.status(400).send({ msg: "bad route" });
});

export default app;
