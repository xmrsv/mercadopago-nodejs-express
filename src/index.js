// src/index.js

import express from "express";
import morgan from "morgan";
import path from "path";
import paymentRoutes from "./routes/payment.routes.js";
import { PORT } from "./config.js";
import cors from "cors";
import { logger } from "./utils/logger.js";


logger.info("Starting server...");

const app = express();

logger.info("Setting up middlewares...");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
logger.info("Middlewares set up!");

logger.info("Setting up routes...");
app.use(paymentRoutes);
logger.info("Routes set up!");

logger.info("Setting up static files...");
app.use(express.static(path.resolve("src/public")));
logger.info("Static files set up!");

app.listen(PORT, () => {
  logger.info(`Server started! running on port ${PORT}`);
});
