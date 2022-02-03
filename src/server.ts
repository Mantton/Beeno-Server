import app from "./app";
import { APP_NAME } from "./config/constants";
import { ENVIRONMENT, PORT } from "./utils";
import { logger } from "./utils";
const server = app.listen(PORT, () => {
  logger.debug(
    `${APP_NAME} Server is running on port ${PORT} in ${ENVIRONMENT} mode`
  );
});

export default server;
