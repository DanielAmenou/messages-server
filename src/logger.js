const path = require("path");
const { addColors, createLogger, format, transports } = require("winston");
const { combine, timestamp, colorize, printf } = format;

const customFormat = printf(({ level, message, module, timestamp }) => {
  const moduleFormat = module ? ` [${module}] ` : "";
  return `[${timestamp}]${moduleFormat}${level}: ${message}`;
});

const colors = {
  info: "blue",
  debug: "yellow"
};

addColors(colors);

const logger = createLogger({
  level: process.env.LOGS_LEVEL || "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }), colorize(), customFormat),
  transports: []
});

logger.add(new transports.Console({}));

const getLogger = (fileName) => {
  const childLogger = logger.child({ module: fileName ? path.basename(fileName).replace(/\.[^/.]+$/, "") : null });
  childLogger.stream = {
    write: function(message) {
      childLogger.info(message.replace("\n", ""));
    }
  };
  return childLogger;
};

module.exports = getLogger;
