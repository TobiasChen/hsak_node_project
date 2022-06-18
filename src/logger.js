import * as winston from 'winston'
import { config } from './config.js';

export const logger = winston.createLogger({
  level: config.log.level,
  format: winston.format.json(),
  //defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
    new winston.transports.File({ filename: 'console.log'}),
    new winston.transports.Console() // The console gets the loglevel specified witht he property level
  ],
  exitOnError: false
});