export interface Invoice {
  id: string;
  amount: string;
  description: string;
  status: 'pending' | 'paid' | 'expired' | 'cancelled';
  createdAt: Date;
  paidAt?: Date;
  paymentTxHash?: string;
  paymentAmount?: string;
}
