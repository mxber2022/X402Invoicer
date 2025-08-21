# X402 Invoice API

A micro-payment invoicing system built with x402 protocol, Express.js, and TypeScript.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Yarn or npm

### Installation
```bash
yarn install
```

### Environment Setup
Create a `.env` file:
```bash
FACILITATOR_URL="https://x402.org/facilitator"
ADDRESS="0x2d8E271E22A26508817561f12eff0874dD0aA6DA"
PAYMENT_PRICE="$0.001"
```

### Start Server
```bash
yarn dev
```

Server runs on: `http://localhost:4021`

## 📋 API Endpoints

### 1. Create Invoice
```bash
curl -X POST http://localhost:4021/invoice \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "$1.00",
    "description": "Web design services"
  }'
```

**Response:**
```json
{
  "invoice": {
    "id": "INV-1755400327339-7ibwsksjn",
    "amount": "$25.00",
    "description": "Web design services",
    "status": "pending",
    "createdAt": "2025-08-17T03:12:07.339Z"
  },
  "paymentUrl": "http://localhost:4021/pay?invoiceId=INV-1755400327339-7ibwsksjn"
}
```

### 2. List All Invoices
```bash
curl http://localhost:4021/invoice
```

**Response:**
```json
[
  {
    "id": "INV-1755400327339-7ibwsksjn",
    "amount": "$25.00",
    "description": "Web design services",
    "status": "pending",
    "createdAt": "2025-08-17T03:12:07.339Z"
  }
]
```

### 3. Get Specific Invoice
```bash
curl http://localhost:4021/invoice/INV-1755400885490-x0cmtckhs
```

**Response:**
```json
{
  "id": "INV-1755400327339-7ibwsksjn",
  "amount": "$25.00",
  "description": "Web design services",
  "status": "pending",
  "createdAt": "2025-08-17T03:12:07.339Z"
}
```

### 4. Pay Invoice (x402 Payment Required)
```bash
curl "http://localhost:4021/pay?invoiceId=INV-1755402755740-7ckbxs3k0"
```

### 5. Mark Invoice as Paid with Transaction Hash
```bash
curl -X POST http://localhost:4021/invoice/INV-1755400885490-x0cmtckhs/mark-paid \
  -H "Content-Type: application/json" \
  -d '{
    "txHash": "0x1234567890abcdef1234567890abcdef12345678",
    "paymentAmount": "$1.00"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Invoice marked as paid!",
  "invoice": {
    "id": "INV-1755400885490-x0cmtckhs",
    "amount": "$1.00",
    "description": "Web design services",
    "status": "paid",
    "createdAt": "2025-08-17T03:12:07.339Z",
    "paidAt": "2025-08-17T03:15:30.123Z",
    "paymentTxHash": "0x1234567890abcdef1234567890abcdef12345678",
    "paymentAmount": "$1.00"
  }
}
```

**Response (402 Payment Required):**
```json
{
  "x402Version": 1,
  "error": "X-PAYMENT header is required",
  "accepts": [
    {
      "scheme": "exact",
      "network": "base-sepolia",
      "maxAmountRequired": "25000000",
      "resource": "http://localhost:4021/pay",
      "description": "",
      "mimeType": "",
      "payTo": "0x2d8E271E22A26508817561f12eff0874dD0aA6DA",
      "maxTimeoutSeconds": 60,
      "asset": "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      "extra": {
        "name": "USDC",
        "version": "2"
      }
    }
  ]
}
```

## 📊 Status Tracking Commands

### 1. Get Status Summary
```bash
curl http://localhost:4021/invoice/status/summary
```

**Response:**
```json
{
  "pending": 2,
  "paid": 1,
  "total": 3
}
```

### 2. Check Detailed Invoice Status
```bash
curl http://localhost:4021/invoice/INV-XXXXX | jq '{id, status, createdAt, paidAt, paymentTxHash, paymentAmount}'
```

**Response with Transaction Hash:**
```json
{
  "id": "INV-1755400885490-x0cmtckhs",
  "amount": "$1.00",
  "description": "Web design services",
  "status": "paid",
  "createdAt": "2025-08-17T03:12:07.339Z",
  "paidAt": "2025-08-17T03:15:30.123Z",
  "paymentTxHash": "0x1234567890abcdef1234567890abcdef12345678",
  "paymentAmount": "$1.00"
}
```

### 3. Filter by Status
```bash
# Pending invoices
curl http://localhost:4021/invoice | jq '[.[] | select(.status == "pending")]'

# Paid invoices
curl http://localhost:4021/invoice | jq '[.[] | select(.status == "paid")]'
```

### 4. Get Payment History with Transaction Hashes
```bash
curl http://localhost:4021/invoice | jq '[.[] | select(.status == "paid") | {id, amount, paidAt, paymentTxHash, paymentAmount}]'
```

**Response:**
```json
[
  {
    "id": "INV-1755400885490-x0cmtckhs",
    "amount": "$1.00",
    "paidAt": "2025-08-17T03:15:30.123Z",
    "paymentTxHash": "0x1234567890abcdef1234567890abcdef12345678",
    "paymentAmount": "$1.00"
  }
]
```

### 5. Check All Invoice Statuses
```bash
curl http://localhost:4021/invoice | jq '.[] | {id, amount, status}'
```

### 6. Get Status Summary with Amounts
```bash
curl http://localhost:4021/invoice | jq 'group_by(.status) | map({status: .[0].status, count: length, total: map(.amount | gsub("\\$"; "") | tonumber) | add})'
```

## 🧪 Complete Test Flow

### Step 1: Create Multiple Invoices
```bash
# Create invoice 1
curl -X POST http://localhost:4021/invoice \
  -H "Content-Type: application/json" \
  -d '{"amount": "$15.00", "description": "Logo design"}'

# Create invoice 2
curl -X POST http://localhost:4021/invoice \
  -H "Content-Type: application/json" \
  -d '{"amount": "$50.00", "description": "Website development"}'

# Create invoice 3
curl -X POST http://localhost:4021/invoice \
  -H "Content-Type: application/json" \
  -d '{"amount": "$8.75", "description": "Consultation"}'
```

### Step 2: List All Invoices
```bash
curl http://localhost:4021/invoice | jq .
```

### Step 3: Check Status Summary
```bash
curl http://localhost:4021/invoice/status/summary
```

### Step 4: Test Payment for Each Invoice
```bash
# Get the invoice IDs from step 2, then test each:
curl "http://localhost:4021/pay?invoiceId=INV-XXXXX" | jq .
```

### Step 5: Monitor Status Changes
```bash
# Check status before payment
curl http://localhost:4021/invoice/INV-XXXXX | jq '{id, status}'

# After successful x402 payment, check status again
curl http://localhost:4021/invoice/INV-XXXXX | jq '{id, status, paidAt}'
```

## 🔧 Project Structure

```
x402api/
├── src/
│   ├── types/
│   │   └── invoice.ts          # Type definitions
│   ├── models/
│   │   └── invoiceModel.ts     # Data layer
│   ├── controllers/
│   │   └── invoiceController.ts # Business logic
│   ├── routes/
│   │   └── invoiceRoutes.ts    # Route definitions
│   ├── middleware/
│   │   └── paymentMiddleware.ts # x402 middleware config
│   ├── utils/
│   │   └── invoiceUtils.ts     # Utility functions
│   ├── app.ts                  # Express app setup
│   └── server.ts               # Server entry point
├── package.json
└── tsconfig.json
```

## 💡 How It Works

1. **Create Invoice**: POST to `/invoice` with amount and description
2. **Get Payment URL**: Each invoice gets a unique payment URL
3. **x402 Protection**: Payment URL requires x402 payment before access
4. **Payment Processing**: After successful x402 payment, invoice is marked as "paid"
5. **Status Tracking**: Monitor invoice status changes and payment history

## 🔒 x402 Payment Flow

1. User visits payment URL
2. x402 middleware intercepts request
3. Returns HTTP 402 with payment requirements
4. User must provide valid `X-PAYMENT` header
5. After payment, invoice status changes to "paid"

## 📝 Notes

- **In-Memory Storage**: Invoices are lost on server restart
- **Production Ready**: Add database (PostgreSQL, MongoDB) for persistence
- **x402 Protocol**: Uses USDC on Base Sepolia testnet
- **Dynamic Pricing**: Each invoice has its own payment amount
- **Status Tracking**: Enhanced status tracking with payment details

## 🚀 Next Steps

- Add database persistence
- Create web frontend
- Add user authentication
- Implement webhook notifications
- Add payment history tracking
- Add invoice expiration logic
