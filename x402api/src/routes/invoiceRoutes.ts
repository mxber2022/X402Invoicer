import { Router } from 'express';
import { InvoiceController } from '../controllers/invoiceController';

const router = Router();

// Create invoice
router.post('/', InvoiceController.createInvoice);

// Get invoice details
router.get('/:id', InvoiceController.getInvoice);

// List all invoices
router.get('/', InvoiceController.getAllInvoices);

// Get status summary
router.get('/status/summary', InvoiceController.getStatusSummary);

export default router;
