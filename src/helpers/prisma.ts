import { PrismaClient } from "@prisma/client";
import { LOG_QUERIES } from "../config/constants";
import { logger } from "../utils";

export const database = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

database.$on("query", (e) => {
  if (!LOG_QUERIES) {
    return;
  }
  logger.debug(
    `Query: ${e.query}\nParams: ${e.params}\nDuration: ${e.duration}ms\n`
  );
});
