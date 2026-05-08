export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  brandName: string;
  category: string;
  company: string;
  barcode: string;
  batchNumber: string;
  sku: string;
  purchasePrice: number;
  sellingPrice: number;
  discountPercentage: number;
  taxPercentage: number;
  expiryDate: string;
  manufacturingDate: string;
  stock: number;
  lowStockThreshold: number;
  unit: 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Other';
  prescriptionRequired: boolean;
  location: string;
  supplierId: string;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  customerName: string;
  customerPhone?: string;
  items: SaleItem[];
  totalBeforeTax: number;
  totalTax: number;
  totalDiscount: number;
  grandTotal: number;
  paymentMethod: 'Cash' | 'Card' | 'Online';
  status: 'Completed' | 'Refunded';
  sellerId: string;
  createdAt: string;
}

export interface SaleItem {
  medicineId: string;
  medicineName: string;
  quantity: number;
  pricePerUnit: number;
  discount: number;
  total: number;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  outstandingBalance: number;
}

export interface Purchase {
  id: string;
  supplierId: string;
  items: PurchaseItem[];
  totalAmount: number;
  status: 'Received' | 'Pending' | 'Cancelled';
  invoiceNumber: string;
  createdAt: string;
}

export interface PurchaseItem {
  medicineId: string;
  quantity: number;
  purchasePrice: number;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'Admin' | 'Pharmacist' | 'Staff';
  photoURL?: string;
}
