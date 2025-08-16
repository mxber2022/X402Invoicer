# X402Invoicer — HTTP-Native Invoice Payments on Sei

**X402Invoicer** enables seamless invoice payments over a **single HTTP flow**, leveraging the x402 micro-payment standard and the blazing-fast **Sei blockchain**.

---

## 🚀 Highlights

- **x402 Payments**: Clients hit a "pay" endpoint and either receive an invoice or are prompted to pay using HTTP 402. Payments are embedded in the `X-PAYMENT` header—no wallet UI needed.
  > :contentReference[oaicite:3]{index=3}

- **On-chain Settlement**: All payments settle as native USDC on Sei, a performant EVM-compatible L1.
  > :contentReference[oaicite:4]{index=4}

- **Automated Invoice Processing**: Invoices are instantly updated to "Paid" after a successful on-chain settlement.

- **Agent-Ready**: Fully compatible with AI agent workflows—ideal for autonomous systems.

---

## 🏗️ Architecture Overview

```mermaid
graph LR
    A[Client / AI Agent] --> B[GET /invoice/{id}/pay]
    B --> C[HTTP 402 + x402 instructions]
    C --> D[X-PAYMENT header with EIP-712 signature]
    D --> E[Facilitator settles on Sei]
    E --> F[Invoice marked as Paid]
    F --> G[UI updates immediately]
    
    style A fill:#e1f5fe
    style G fill:#c8e6c9
```

**Flow Details:**
1. **Request**: Client/Agent hits `GET /invoice/{id}/pay`
2. **Response**: Server responds with HTTP 402 + x402 instructions
3. **Payment**: Client retries with `X-PAYMENT` header (EIP-712 signed)
4. **Settlement**: Facilitator settles payment on Sei in native USDC
5. **Validation**: Invoice Server validates settlement → marks invoice Paid
6. **Update**: UI updates immediately

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Backend** | Node.js / Express or NestJS + `x402-express` middleware |
| **Blockchain** | Sei L1 (EVM-compatible) with native USDC support |
| **Storage** | PostgreSQL (invoices), Redis (queue tracking) |
| **Dashboard** | Next.js or similar frontend |
| **x402 Handling** | `x402-express` for seamless middleware integration |
| **Payment Settlement** | Facilitator (e.g. Coinbase's or custom) |
| **Payments** | Managed directly over HTTP with EIP-712 signed headers |

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL
- Redis
- Sei wallet with USDC

### Installation

```bash
# Clone the repository
git clone https://github.com/mxber2022/X402Invoicer
cd X402Invoicer

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Configuration

```bash
# Required environment variables
X402_FACILITATOR_ENDPOINT=your_facilitator_endpoint
WALLET_ADDRESS=your_wallet_address
DATABASE_URL=postgresql://user:pass@localhost:5432/x402invoicer
REDIS_URL=redis://localhost:6379
```

### Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

---

## 🎯 Demo Flow

### 1. Invoice Creation
Seller creates invoice through the dashboard interface.

### 2. Payment Request
Agent hits `GET /invoice/{id}/pay` → receives HTTP 402 + payment details.

### 3. Payment Processing
Agent processes payment via `X-PAYMENT` header with proper EIP-712 signature.

### 4. Settlement Confirmation
Invoice status updates to "Paid" instantly upon on-chain confirmation.

---

## 📄 License

**MIT License** — Built using open standards like x402 and leveraging the Sei blockchain.

---

> **X402Invoicer** — Where HTTP meets seamless on-chain payment logic on Sei. ⚡
