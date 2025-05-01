import express from "express";
import morgan from "morgan";
import path from "path";
import paymentRoutes from "./routes/payment.routes.js";
import { PORT } from "./config.js";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(paymentRoutes);

app.use(express.static(path.resolve("src/public")));

app.listen(PORT, () => {
  console.log(`Ready! Server on port ${PORT}`);
});
