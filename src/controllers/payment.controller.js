import mercadopage from "mercadopago";
import {
  BACKURL_FAILURE,
  BACKURL_PENDING,
  BACKURL_SUCCESS,
  MERCADOPAGO_API_KEY,
  WEBHOOK_URL,
} from "../config.js";

export const createOrder = async (req, res) => {
  mercadopage.configure({
    access_token: MERCADOPAGO_API_KEY,
  });

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

    // res.json({ message: "Payment creted" });
    res.json(result.body);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    console.log(payment);
    if (payment.type === "payment") {
      const data = await mercadopage.payment.findById(payment["data.id"]);
      console.log(data);
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
