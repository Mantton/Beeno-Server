import { REDIS_HOST } from "../utils";

import { createClient } from "redis";
import logger from "../utils/logger";

const redisClient = (() => {
  const client = createClient({
    url: REDIS_HOST,
  });

  return client;
})();

redisClient.on("error", (err) => {
  logger.error(`Redis Client Error: ${err.message}`);
  process.exit(1);
});
redisClient.on("connect", () => {
  logger.info("Redis Connected Successfully");
});
redisClient.on("quit", () => {
  logger.info("Redis Disconnected Successfully");
});
export default redisClient;
