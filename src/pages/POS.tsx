import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  CreditCard, 
  Trash2, 
  Minus, 
  Plus, 
  Printer,
  X,
  PlusCircle,
  QrCode
} from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Medicine, SaleItem } from '../types';
import { toast } from 'sonner';

// Sample inventory for POS
const mockInventory: Medicine[] = [
  {
    id: '1',
    name: 'Amoxicillin 500mg',
    brandName: 'Amoxil',
    genericName: 'Amoxicillin',
    category: 'Antibiotic',
    company: 'GSK',
    barcode: '1',
    batchNumber: 'AX1',
    sku: 'S1',
    purchasePrice: 10,
    sellingPrice: 15,
    discountPercentage: 0,
    taxPercentage: 5,
    expiryDate: '2025-01-01',
    manufacturingDate: '2024-01-01',
    stock: 100,
    lowStockThreshold: 10,
    unit: 'Capsule',
    prescriptionRequired: true,
    location: 'A1',
    supplierId: 'S1',
    description: '',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '2',
    name: 'Paracetamol 650mg',
    brandName: 'Dolo 650',
    genericName: 'Paracetamol',
    category: 'Analgesic',
    company: 'Micro',
    barcode: '2',
    batchNumber: 'AX2',
    sku: 'S2',
    purchasePrice: 2,
    sellingPrice: 5,
    discountPercentage: 0,
    taxPercentage: 0,
    expiryDate: '2026-01-01',
    manufacturingDate: '2024-01-01',
    stock: 500,
    lowStockThreshold: 20,
    unit: 'Tablet',
    prescriptionRequired: false,
    location: 'B1',
    supplierId: 'S1',
    description: '',
    createdAt: '',
    updatedAt: '',
  }
];

export function POS() {
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerName, setCustomerName] = useState('Walk-in Customer');
  const [isPrinting, setIsPrinting] = useState(false);

  const filteredMedicines = mockInventory.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.barcode === searchTerm
  );

  const addToCart = (medicine: Medicine) => {
    const existing = cart.find(item => item.medicineId === medicine.id);
    if (existing) {
      if (existing.quantity >= medicine.stock) {
        toast.error('Not enough stock available', {
          style: { fontSize: '10px', fontWeight: 'bold' }
        });
        return;
      }
      setCart(cart.map(item => 
        item.medicineId === medicine.id 
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.pricePerUnit }
          : item
      ));
    } else {
      setCart([...cart, {
        medicineId: medicine.id,
        medicineName: medicine.name,
        quantity: 1,
        pricePerUnit: medicine.sellingPrice,
        discount: 0,
        total: medicine.sellingPrice
      }]);
    }
    toast.success(`${medicine.name} added`, {
      style: { fontSize: '10px', fontWeight: 'bold' },
      duration: 1000
    });
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.medicineId !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.medicineId === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty, total: newQty * item.pricePerUnit };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.05; 
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    setIsPrinting(true);
    toast.success('Transaction completed successfully!');
    setTimeout(() => {
      setIsPrinting(false);
      setCart([]);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex gap-6 h-[calc(100vh-140px)]"
    >
      <div className="flex-1 flex flex-col min-w-0 space-y-4">
        <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="F1: Search by name, brand, or SKU..." 
              className="w-full pl-8 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded text-[11px] focus:ring-1 focus:ring-emerald-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <button className="px-3 py-1.5 bg-slate-900 text-white rounded text-[10px] font-bold uppercase tracking-tighter hover:bg-slate-800">
            Rapid Scan
          </button>
        </div>

        <div className="flex-1 bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col">
          <div className="overflow-y-auto flex-1">
            <table className="w-full text-left high-density-table">
              <thead>
                <tr>
                  <th className="w-1/2">Product Description</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicines.map((medicine) => (
                  <tr key={medicine.id} className="hover:bg-slate-50 group h-10">
                    <td>
                      <div>
                        <p className="font-bold text-slate-900">{medicine.name}</p>
                        <p className="text-[9px] text-slate-500 font-mono italic uppercase">{medicine.genericName}</p>
                      </div>
                    </td>
                    <td>
                      <span className={cn(
                        "font-black text-[10px]",
                        medicine.stock < 20 ? "text-rose-600" : "text-emerald-600"
                      )}>
                        {medicine.stock} {medicine.unit}
                      </span>
                    </td>
                    <td className="font-bold text-slate-900">{formatCurrency(medicine.sellingPrice)}</td>
                    <td className="text-right">
                      <button 
                        onClick={() => addToCart(medicine)}
                        className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded text-[10px] font-bold uppercase hover:bg-emerald-600 hover:text-white transition-all"
                      >
                        Add (F2)
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-80 flex flex-col space-y-4">
        <div className="bg-slate-900 rounded-lg p-4 text-white shadow-lg flex flex-col min-h-[160px]">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Payable</p>
            <div className="p-1 px-2 bg-emerald-500/20 text-emerald-400 rounded text-[9px] font-bold uppercase">
              Live Checkout
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-black">{formatCurrency(total)}</h2>
            <div className="flex items-center gap-2 mt-1">
              <User className="w-3 h-3 text-slate-400" />
              <input 
                type="text" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="bg-transparent border-none p-0 text-[10px] text-slate-400 focus:ring-0 outline-none w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
          <div className="p-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Billing Queue</h3>
            <button 
              onClick={() => setCart([])}
              className="text-[9px] font-bold text-rose-500 hover:underline"
            >
              Clear Order
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <AnimatePresence initial={false}>
              {cart.map((item) => (
                <motion.div 
                  key={item.medicineId}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100 group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold truncate leading-tight">{item.medicineName}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-sm">
                        <button onClick={() => updateQuantity(item.medicineId, -1)} className="px-1 text-slate-400">
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-[10px] font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.medicineId, 1)} className="px-1 text-slate-400">
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      <span className="text-[9px] text-slate-400">@ {formatCurrency(item.pricePerUnit)}</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-[11px] font-black">{formatCurrency(item.total)}</p>
                    <button onClick={() => removeFromCart(item.medicineId)} className="text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {cart.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-2 opacity-50 py-10">
                <ShoppingCart className="w-6 h-6" />
                <p className="text-[10px] font-bold uppercase">Empty Queue</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2">
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-slate-500">SUBTOTAL</span>
              <span className="font-mono">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-slate-500">GST (5%)</span>
              <span className="font-mono">{formatCurrency(tax)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-black">
              <span className="text-[10px] font-bold text-slate-500 uppercase self-center">Total</span>
              <span className="text-emerald-600 font-mono">{formatCurrency(total)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={isPrinting || cart.length === 0}
              className={cn(
                "w-full py-2.5 rounded font-bold text-[10px] uppercase tracking-widest transition-all mt-2",
                cart.length > 0 && !isPrinting
                  ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md" 
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              )}
            >
              {isPrinting ? "Processing..." : "Complete Payment (Enter)"}
            </button>
            <div className="flex gap-1 justify-center">
              <button className="p-1 px-2 border border-slate-200 rounded text-[9px] font-bold text-slate-500 hover:bg-white uppercase transition-colors">
                <Printer className="w-2.5 h-2.5 inline mr-1" /> A4 Bill
              </button>
              <button className="p-1 px-2 border border-slate-200 rounded text-[9px] font-bold text-slate-500 hover:bg-white uppercase transition-colors">
                <QrCode className="w-2.5 h-2.5 inline mr-1" /> QR Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
