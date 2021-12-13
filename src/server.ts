import app from "./app";
import { APP_NAME } from "./config/constants";
import { ENVIRONMENT, PORT } from "./utils";

const server = app.listen(PORT, () => {
  console.log(
    `  ${APP_NAME} Server is running on port ${PORT} in ${ENVIRONMENT} mode`
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
