import { Invoice } from '../types/invoice';
import { generateInvoiceId } from '../utils/invoiceUtils';

// In-memory storage for invoices
const invoices = new Map<string, Invoice>();

export class InvoiceModel {
  static create(amount: string, description: string): Invoice {
    // Convert dollar amount to cents for storage
    const amountInCents = Math.round(parseFloat(amount.replace('$', '')) * 100);
    const formattedAmount = `$${(amountInCents / 100).toFixed(2)}`;
    
    const invoice: Invoice = {
      id: generateInvoiceId(),
      amount: formattedAmount,
      description,
      status: 'pending',
      createdAt: new Date()
    };
    
    invoices.set(invoice.id, invoice);
    return invoice;
  }

  static getById(id: string): Invoice | undefined {
    return invoices.get(id);
  }

  static getAll(): Invoice[] {
    return Array.from(invoices.values());
  }

  static markAsPaid(id: string, txHash?: string, paymentAmount?: string): boolean {
    const invoice = invoices.get(id);
    if (invoice) {
      invoice.status = 'paid';
      invoice.paidAt = new Date();
      invoice.paymentTxHash = txHash;
      invoice.paymentAmount = paymentAmount;
      invoices.set(id, invoice);
      return true;
    }
    return false;
  }

  static getStatusSummary(): { pending: number; paid: number; total: number } {
    const allInvoices = this.getAll();
    const pending = allInvoices.filter(inv => inv.status === 'pending').length;
    const paid = allInvoices.filter(inv => inv.status === 'paid').length;
    
    return {
      pending,
      paid,
      total: allInvoices.length
    };
  }
}
