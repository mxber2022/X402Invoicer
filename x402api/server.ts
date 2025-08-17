import {config} from "dotenv";
import express from "express";
import {paymentMiddleware, Resource} from "@sei-js/x402-express";
config();

const facilitatorUrl = process.env.FACILITATOR_URL as Resource;
const payTo = process.env.ADDRESS as `0x${string}`;

if (!facilitatorUrl || !payTo) {
  console.error("Missing required environment variables");
  process.exit(1);
}

const app = express();

app.use(
  paymentMiddleware(
    payTo,
    {
      "GET /weather": {
        // USDC amount in dollars
        price: "$0.001",
        network: "base-sepolia",
      }
    },
    {
        url: facilitatorUrl,
    },
   ),
);

app.get("/weather", (req, res) => {
res.send({
    report: {
        weather: "sunny",
        temperature: 70,
    },
  });
});

app.listen(4021, () => {
  console.log(`Server listening at http://localhost:${4021}`);
});