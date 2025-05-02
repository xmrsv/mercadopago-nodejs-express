// src/config.js

import { config } from "dotenv";
import { logger } from "./utils/logger.js";

logger.info("Loading environment variables...");
config();


export const PORT = process.env.PORT || 3000;
export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY;
export const WEBHOOK_URL = process.env.WEBHOOK_URL;
export const BACKURL_SUCCESS = process.env.BACKURL_SUCCESS;
export const BACKURL_FAILURE = process.env.BACKURL_FAILURE;
export const BACKURL_PENDING = process.env.BACKURL_PENDING;

logger.info("Environment variables loaded!");
