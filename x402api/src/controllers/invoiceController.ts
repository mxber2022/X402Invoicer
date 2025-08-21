import { Request, Response } from 'express';
import { InvoiceModel } from '../models/invoiceModel';

export class InvoiceController {
  static createInvoice(req: Request, res: Response): void {
    const { amount, description } = req.body;
    
    if (!amount || !description) {
      res.status(400).json({ error: "Amount and description are required" });
      return;
    }
    
    const invoice = InvoiceModel.create(amount, description);
    
    res.json({
      invoice,
      paymentUrl: `http://localhost:4021/pay?invoiceId=${invoice.id}`
    });
  }

  static getInvoice(req: Request, res: Response): void {
    const invoice = InvoiceModel.getById(req.params.id);
    
    if (!invoice) {
      res.status(404).json({ error: "Invoice not found" });
      return;
    }
    
    res.json(invoice);
  }

  static getAllInvoices(req: Request, res: Response): void {
    const invoices = InvoiceModel.getAll();
    res.json(invoices);
  }

  static processPayment(req: Request, res: Response): void {
    console.log("Processing payment...");
    // console.log(req);
    // console.log(res);

    const { invoiceId, txHash, paymentAmount } = req.query;
    
    if (!invoiceId || typeof invoiceId !== 'string') {
      res.status(400).json({ error: "Invoice ID is required" });
      return;
    }
    
    console.log("txHash: ", txHash);

    const success = InvoiceModel.markAsPaid(
      invoiceId, 
      txHash as string, 
      paymentAmount as string
    );
    
    if (!success) {
      res.status(404).json({ error: "Invoice not found" });
      return;
    }
    
    const invoice = InvoiceModel.getById(invoiceId);
    
    res.json({
      success: true,
      message: "Payment successful!",
      invoice
    });
  }

  static getStatusSummary(req: Request, res: Response): void {
    const summary = InvoiceModel.getStatusSummary();
    res.json(summary);
  }
}
