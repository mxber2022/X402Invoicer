import { config } from "dotenv";
import express from "express";
import { paymentMiddleware, Resource } from "@sei-js/x402-express";
import invoiceRoutes from './routes/invoiceRoutes';
import { InvoiceController } from './controllers/invoiceController';
import { InvoiceModel } from './models/invoiceModel';
// import { facilitator } from "@sei-js/x402";

config();

const facilitatorUrl = process.env.FACILITATOR_URL as string;
const payTo = process.env.ADDRESS as `0x${string}`;
const price = process.env.PAYMENT_PRICE || "$0.001";
const network = process.env.NETWORK as "sei" | "base-sepolia" | "base" | "avalanche-fuji" | "avalanche" | "iotex" | "sei-testnet";

if (!facilitatorUrl || !payTo || !network) {
  console.error("Missing required environment variables: FACILITATOR_URL, ADDRESS, or NETWORK");
  process.exit(1);
}

console.log(`Network configured: ${network}`);

const app = express();

app.use(express.json());

// Dynamic payment middleware that checks invoice amount
app.use((req, res, next) => {
  if (req.path === '/pay' && req.method === 'GET') {
    const { invoiceId } = req.query;
    
    if (invoiceId && typeof invoiceId === 'string') {
      const invoice = InvoiceModel.getById(invoiceId);
      
      if (invoice) {
        // Configure x402 middleware with invoice-specific price
        const dynamicPaymentMiddleware = paymentMiddleware(
          payTo,
          {
            "GET /pay": {
              price: invoice.amount,
              network: network,
              config: {
                description: "Premium API access",
                maxTimeoutSeconds: 120,
              }
            }
          },
          {
            url: facilitatorUrl as Resource,
          }
        );
        
        return dynamicPaymentMiddleware(req, res, next);
      }
    }
  }
  
  next();
});

// Invoice routes
app.use('/invoice', invoiceRoutes);

// Payment endpoint - only reached after x402 payment is successful
app.get("/pay", InvoiceController.processPayment);

export default app;
