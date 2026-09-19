import { appendFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const REQUEST_LOG = resolve('request.log');
const ERROR_LOG = resolve('error.log');

const writeLog = (file, entry) => {
  appendFile(file, `${JSON.stringify(entry)}\n`).catch(() => {});
};

export const requestLogger = (req, res, next) => {
  const startedAt = Date.now();

  res.on('finish', () => {
    writeLog(REQUEST_LOG, {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: Date.now() - startedAt,
    });
  });

  next();
};

export const errorLogger = (err, req, res, next) => {
  writeLog(ERROR_LOG, {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    status: err.statusCode || 500,
    name: err.name,
    message: err.message,
    stack: err.stack,
  });

  next(err);
};
