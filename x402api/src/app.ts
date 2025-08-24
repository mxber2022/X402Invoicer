import { config } from "dotenv";
import express from "express";
import { paymentMiddleware, Resource } from "@sei-js/x402-express";
import invoiceRoutes from './routes/invoiceRoutes';
import { InvoiceController } from './controllers/invoiceController';
import { InvoiceModel } from './models/invoiceModel';

config();

const facilitatorUrl = process.env.FACILITATOR_URL as string;
const payTo = process.env.ADDRESS as `0x${string}`;
const price = process.env.PAYMENT_PRICE || "$0.001";

if (!facilitatorUrl || !payTo) {
  console.error("Missing required environment variables");
  process.exit(1);
}

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
              network: "sei",
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
