// src/utils/logger.js

export class Logger {
  logs = [];

  constructor() {
    this.logs = [];
  }

  info(message) {
    const timestamp = new Date().toISOString();
    this.logs.push({ timestamp, message });
    console.log(`[${timestamp}] [INFO] ${message}`);
  }

  warn(message) {
    const timestamp = new Date().toISOString();
    this.logs.push({ timestamp, message });
    console.warn(`[${timestamp}] [WARN] ${message}`);
  }

  error(message) {
    const timestamp = new Date().toISOString();
    this.logs.push({ timestamp, message });
    console.error(`[${timestamp}] [ERROR] ${message}`);
  }

  getLogs() {
    return this.logs;
  }
}
export const logger = new Logger();
