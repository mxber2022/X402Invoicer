// Generate unique invoice ID
export const generateInvoiceId = (): string => {
  return `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
