'use strict';

const pkg = require('./package.json');

const config = {
  app: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT
  },
  cors: {
    enabled: true
  },
  logger: {
    enabled: process.env.LOGGER_ENABLED !== 'false',
    level: process.env.LOGGER_LEVEL,
    stream: process.env.LOGGER_STREAM
  }
};

if (config.logger.level === 'trace') {
  console.log(JSON.stringify(config)); // eslint-disable-line no-console
}

module.exports = config;
