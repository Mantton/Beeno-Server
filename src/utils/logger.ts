import * as winston from "winston";

const colorizer = winston.format.colorize();

const alignColorsAndTime = winston.format.combine(
  winston.format.label({
    label: "[LOGGER]",
  }),
  winston.format.timestamp({
    format: "YY-MM-DD HH:MM:SS",
  }),
  winston.format.printf((info) =>
    colorizer.colorize(
      info.level,
      `${info.timestamp}  [${info.level.toUpperCase()}]  ${info.message}`
    )
  )
);
const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(alignColorsAndTime),
  transports: [new winston.transports.Console()],
  exitOnError: false,
});

export default logger;
