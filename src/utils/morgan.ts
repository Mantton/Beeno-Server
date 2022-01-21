import morgan from "morgan";
import chalk from "chalk";

/**
 * HTTP Logs
 */
export const morganLogger = morgan(function (tokens, req, res) {
  return [
    chalk.gray(`[${tokens["date"](req, res)}]`),
    chalk.green(tokens.method(req, res)),
    chalk.white(tokens.url(req, res)),
    colorStatus(tokens.status(req, res) ?? ""),
    chalk.blue.italic(`"${tokens["user-agent"](req, res)}"`),
    chalk.yellow(tokens["response-time"](req, res) + " ms"),
  ].join(" ");
});

const colorStatus = (statusString: string) => {
  const status = parseInt(statusString);

  const colored =
    status >= 500
      ? chalk.red(statusString)
      : status >= 400
      ? chalk.yellow(statusString)
      : status >= 300
      ? chalk.cyan(statusString)
      : status >= 200
      ? chalk.green(statusString)
      : chalk.grey(statusString);

  return colored;
};
