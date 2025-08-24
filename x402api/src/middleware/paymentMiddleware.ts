import { paymentMiddleware as x402PaymentMiddleware, Resource } from "@sei-js/x402-express";

export const configurePaymentMiddleware = (payTo: `0x${string}`, facilitatorUrl: Resource, price: string, network: string) => {
  return x402PaymentMiddleware(
    payTo,
    {
      "GET /pay": {
        // USDC amount in dollars - will be set dynamically per invoice
        price: price,
        network: network as "sei" | "base-sepolia" | "base" | "avalanche-fuji" | "avalanche" | "iotex" | "sei-testnet",
      }
    },
    {
      url: facilitatorUrl,
    },
  );
};
