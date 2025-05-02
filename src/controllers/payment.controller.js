// src/controllers/payment.controller.js

import mercadopage from "mercadopago";
import {
  BACKURL_FAILURE,
  BACKURL_PENDING,
  BACKURL_SUCCESS,
  MERCADOPAGO_API_KEY,
  WEBHOOK_URL,
} from "../config.js";
import { logger } from "../utils/logger.js";

logger.info("Configuring MercadoPago...");
mercadopage.configure({
  access_token: MERCADOPAGO_API_KEY,
});
logger.info("MercadoPago configured!");

export const createOrder = async (req, res) => {

  const newOrderItem = {
    title: req.body.title,
    unit_price: req.body.unit_price,
    description: req.body.description,
    currency_id: "PEN",
    quantity: req.body.quantity,
  };

  try {
    const result = await mercadopage.preferences.create({
      items: [
        {
          title: "Laptop",
          unit_price: 500,
          currency_id: "PEN",
          quantity: 1,
        },
      ],
      notification_url: `${WEBHOOK_URL}/webhook`,
      back_urls: {
        success: `${BACKURL_SUCCESS}`,
        failure: `${BACKURL_FAILURE}`,
        pending: `${BACKURL_PENDING}`,
      },
      payment_methods: {
        installments: 1,
      },
    });

    console.log(result);

    logger.info("Order created" + JSON.stringify(result));
    res.json(result.body);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    logger.info("Payment received" + JSON.stringify(payment));
    if (payment.type === "payment") {
      const data = await mercadopage.payment.findById(payment["data.id"]);
      logger.info("Payment data" + JSON.stringify(data));
    }

    res.sendStatus(204);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
