'use strict';

const config = require('./environment.json');
const path = require('path');
const winston = require('winston');

const logFolder = process.env.LOG_FOLDER;

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logFolder, 'web-ui.log')
    })
  ]
});

if (config.environment !== 'production') {
  logger.add(new winston.transports.Console());
}

module.exports = {
  logger: logger
};
