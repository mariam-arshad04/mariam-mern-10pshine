const pino = require("pino");

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,          // colored output
      translateTime: "SYS:standard", // readable timestamp
    },
  },
});

module.exports = logger;
