# X402Invoicer — HTTP-Native Invoice Payments on Sei

**X402Invoicer** enables seamless invoice payments over a **single HTTP flow**, leveraging the x402 micro-payment standard and the blazing-fast **Sei blockchain**.

---

##  Highlights

- **x402 Payments**: Clients hit a "pay" endpoint and either receive an invoice or are prompted to pay using HTTP 402. Payments are embedded in the `X-PAYMENT` header—no wallet UI needed.  
  :contentReference[oaicite:3]{index=3}

- **On-chain Settlement**: All payments settle as native USDC on Sei, a performant EVM-compatible L1.  
  :contentReference[oaicite:4]{index=4}

- **Automated Invoice Processing**: Invoices are instantly updated to "Paid" after a successful on-chain settlement.

- **Agent-Ready**: Fully compatible with AI agent workflows—ideal for autonomous systems.

---

##  Architecture Overview

```

\[Client / AI Agent] → GET /invoice/{id}/pay
↳ Invoice Server responds with HTTP 402 + x402 instructions
↳ Client retries with `X-PAYMENT` header (EIP-712 signed)
↳ Facilitator settles payment on Sei in native USDC
↳ Invoice Server validates settlement → marks invoice Paid
↳ UI updates immediately

````

---

##  Tech Stack

| Component       | Tech |
|----------------|------|
| Backend        | Node.js / Express or NestJS + `x402-express` middleware |
| Blockchain     | Sei L1 (EVM-compatible) with native USDC support |
| Storage        | PostgreSQL (invoices), Redis (queue tracking) |
| Dashboard      | Next.js or similar frontend |
| x402 Handling  | `x402-express` for seamless middleware integration |
| Payment Settlement | Facilitator (e.g. Coinbase’s or custom) |
| Payments       | Managed directly over HTTP with EIP-712 signed headers |

---

##  Setup Guide

```bash
git clone https://github.com/mxber2022/X402Invoicer
cd X402Invoicer
npm install

# Set environment variables:
# - X402 facilitator endpoint
# - Wallet address

npm run dev
````

### Demo Flow

1. Seller creates invoice in dashboard.
2. Agent hits `GET /invoice/{id}/pay` → gets HTTP 402 + payment details.
3. Agent pays via `X-PAYMENT` header.
4. Invoice updates to "Paid" instantly—thanks to on-chain confirmation.

## License

MIT License — built using open standards like x402 and leveraging the Sei blockchain.

---

**X402Invoicer** — where HTTP meets seamless on-chain payment logic on Sei.
